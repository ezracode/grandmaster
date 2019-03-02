library(plumber)

#* @apiTitle Simple API

#* Echo provided text
#* @param text The text to be echoed in the response
#* @get /echo
function(text = "") {
  list(
    message_echo = paste("This is a message from Plmber REST API, you send this:", text)
  )
}

#* Echo provided text and number
#* @param text The text to be echoed in the response
#* @param number A number to be echoed in the response
#* @get /echo
#* @post /echo
function(req, text = "", number = 0) {
  list(
    message_echo = paste("The text is:", text),
    number_echo = paste("The number is:", number),
    raw_body = req$postBody
  )
}

#* Echo provided text
#* @param text The text to be echoed in the response
#* @get /games
function() {

    if (!require(bigchess)) {
        install.packages("bigchess")
        library(bigchess)
    }

    games01 <- read.pgn("../anand/5722.pgn")
    games02 <- read.pgn("../anand/5724.pgn")
    games03 <- read.pgn("../anand/77352.pgn")

    games <- unique(rbind(games01, games02, games03))
}