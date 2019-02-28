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