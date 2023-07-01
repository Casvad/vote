// SPDX-License-Identifier: MIT

contract Vote {
    enum Candidates { Carlos, Oscar, Liz}
    uint256 timeStart;
    uint256 timeEnd;
    uint256 votingOptions;
    mapping(Candidates => uint) votingOptionsResult;
    mapping(address => bool) userVotedMap;

    event UserVote(address voter);

    constructor(uint256  _timeStart, uint256 _timeEnd){
        timeStart = _timeStart;
        timeEnd = _timeEnd;
        votingOptions = 3;
    }

    function getVotingResult() public view returns (Candidates[] memory, uint[] memory) {
        require(block.timestamp > timeEnd,'You can check only when the voting has finished');

        Candidates[] memory candidates = new Candidates[](votingOptions);
        uint[] memory votes = new uint[](votingOptions);

        for (uint i = 0; i < votingOptions; i++) {
            candidates[i] = Candidates(i);
            votes[i] = votingOptionsResult[Candidates(i)];
        }

        return (candidates, votes);
    }

    function getTimeStart()public view returns(uint){
        return timeStart;
    }
    function getTimeEnd()public view returns(uint){
        return timeEnd;
    }

    function hasAlreadyVoted(address add) public view returns (bool) {

        return userVotedMap[add];
    }

    function vote(Candidates candidate) public {
        
        require(userVotedMap[msg.sender] == false,'User already voted');
        require(block.timestamp > timeStart,'The voting hasent started yet');
        require(block.timestamp < timeEnd,'The voting has already ended');

        userVotedMap[msg.sender] = true;
        votingOptionsResult[candidate] += 1;
        emit UserVote(msg.sender);
    }

}