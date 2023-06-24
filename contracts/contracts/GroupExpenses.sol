pragma solidity ^0.8.4;

contract GroupExpenses {

    address public organizer;
    
    struct Participant {
        string name;
        address waddress;
        int256 balance;
    }

    struct Expense {
        string title;
        int256 amount;
        address payer; 
        address[] payees; 
    }

    struct Payment {
        string title;
        int256 amount;
        address payer;
        address payee;
    }

    modifier onlyByParticipant () {
        require(msg.sender == participants[msg.sender].waddress);
        _;
    }
    
    /// This declares a state variable that stores a `Participant` struct for each possible address.
    mapping(address => Participant) public participants;
    
    // A dynamically-sized array of `Expenses` structs.
    Expense[] public expenses;

    // A dynamically-sized array of `Payments` structs.
    Payment[] public payments;
    
    mapping(address => uint) public withdrawals;

    constructor(string memory _name) {
        organizer = msg.sender;
        createParticipant(_name, msg.sender);
    }
    
    function createParticipant(string memory _name, address _waddress) public {
        require(_waddress != participants[_waddress].waddress); //only one address per participant
        Participant memory participant = Participant({name: _name, waddress: _waddress, balance: 0});
        participants[_waddress] = participant;
    }
    
    function createExpense(string memory _title, int256 _amount, address[] memory _payees) public onlyByParticipant() {
        require(_payees.length > 0 && _payees.length <= 20);
        require(msg.sender == participants[msg.sender].waddress);
        require(isParticipants(_payees));
        Expense memory new_expense = Expense(_title, _amount, msg.sender, _payees);
        expenses.push(new_expense);
        int256 contributors = int256(_payees.length + 1);
        require(contributors > 0, "There must be at least one contributor");

        //adjusts balance each particpant - move to seperate function
        int256 _portion = int256(_amount / contributors);
        participants[msg.sender].balance += (_amount - _portion);
        for (uint i = 0; i < _payees.length; i++) {
            participants[_payees[i]].balance -= _portion;
        }        
    }

    function createPayment(string memory _title, address _payee) public onlyByParticipant() payable {   
        address _payer = msg.sender;
        require(_payee != _payer);
        require(isParticipant(_payer));
        require(isParticipant(_payee));
        Payment memory payment = Payment(_title, int256(msg.value), _payer, _payee );
        payments.push(payment);
        withdrawals[_payee] += msg.value;
        participants[_payer].balance += int256(msg.value);
        participants[_payee].balance -= int256(msg.value);
    }

    function withdraw() public onlyByParticipant()  {
        require(withdrawals[msg.sender] > 0);
        uint amount = withdrawals[msg.sender];
        withdrawals[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

     function getExpenses() public view returns (Expense[] memory) {
        return expenses;
    }

    function getBalance(address _waddress) public view returns (int256) {
        return participants[_waddress].balance;
    }

    function getParticipantName(address _waddress) public view returns (string memory) {
        return participants[_waddress].name;
    }

    
    /// @notice Check if each address of the list is registred as participant
    /// @param list the list of address to check 
    /// @return true if all the list is registred as participant, false otherwise
    function isParticipants(address[] memory list) internal view returns (bool) {
        for (uint i = 0; i < list.length; i++) {
            if (!isParticipant(list[i])) {
                return false;
            }
        }
        return true;
    }

    /// @notice Check if each address of the list is registred as participant
    /// @param _waddress the address to check 
    /// @return true if all the list is registred as participant, false otherwise
    function isParticipant(address _waddress) internal view returns (bool) {
        if (_waddress == participants[_waddress].waddress) {
            return true;
        }else {
            return false;
        }
    }

}