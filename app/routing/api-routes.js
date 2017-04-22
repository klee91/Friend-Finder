var friendsData = require('../data/friends');

module.exports = function(app) {

    app.get("/api/friends", function(req,res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {

        //parse scores to numbers
        for(var p = 0; p < req.body.score.length; p++) {
            req.body.score[p] = parseInt(req.body.score[p]);
        }

        //push new user to friend data
        var newFriend = req.body;
        friendsData.push(newFriend);
        
        //compatability logic comparison between user and friends
        var userScore = friendsData[friendsData.length-1].score;
        console.log("userscore" + userScore);
        var totalDifference;
        var finalResults=[];
        var answer;
        
        //grab user score, and compare to each friend in friendArray's score;
        //loop through friends..
        for (var i = 0; i < (friendsData.length-1); i++) {
            var userTotal= 0;
            var friendTotal = 0;

            //A variable to temporarily hold the current friend's score to compare to user's for each iteration.
            var currentFriendScore = friendsData[i].score;
            var currentFriendName = friendsData[i].name;
            
            // console.log("")
            console.log("friendscore: " + currentFriendScore);
            console.log("name: " + currentFriendName);

            function getDifference() {
                //a second loop to add up answers to separate totals
                for (var j = 0; j < currentFriendScore.length; j++) {
                    userTotal += userScore[j];
                    friendTotal += currentFriendScore[j];
                }
                console.log("userTotal:" + userTotal);
                console.log("friendtotal:" + friendTotal);

                //when finished looping, check which number is larger and get total difference
                    if (friendTotal > userTotal) {
                        totalDifference = friendTotal - userTotal;
                        finalResults.push({
                            name: currentFriendName,
                            totalDiff: totalDifference
                        });
                    } else if (userTotal > friendTotal) {
                        totalDifference = userTotal - friendTotal;
                        finalResults.push({
                            name: currentFriendName,
                            totalDiff: totalDifference
                        });
                    } else if (userTotal === friendTotal) {
                        totalDifference = 0;
                        finalResults.push({
                            name: currentFriendName,
                            totalDiff: totalDifference
                        });
                        
                    }
            }
            getDifference();
        }

        //bubblesort function to sort from least to most total difference
            for (var k = 0; k < finalResults.length - 1; k++) {
                var a = finalResults[k].totalDiff;
                var b = finalResults[k + 1].totalDiff;
                if (a > b) {
                    var temp = finalResults[k];
                    finalResults[k] = finalResults[k+1];
                    finalResults[k+1] = temp;
                }
            }

        //match for best friend
            for (var l = 0; l < friendsData.length; l++) {
                if (finalResults[0].name == friendsData[l].name) {
                    answer = friendsData[l]; 
                    res.json(answer);
                    console.log(answer);
                }
            }
  });
}

