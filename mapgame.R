if(!require(stringr)){
    install.packages("stringr")
    library(stringr)
}

myBoard <- function(movetext){
    moves <- unlist(strsplit(movetext)

    newboard = data.frame()
    board = list (
        a8 = "25", b8 = "26", c8 = "27", d8 = "28", e8 = "29", f8 = "30", g8 = "31", h8 = "32", 
        a7 = "17", b7 = "18", c7 = "19", d7 = "20", e7 = "21", f7 = "22", g7 = "23", h7 = "24", 
        a6 = "00", b6 = "00", c6 = "00", d6 = "00", e6 = "00", f6 = "00", g6 = "00", h6 = "00", 
        a5 = "00", b5 = "00", c5 = "00", d5 = "00", e5 = "00", f5 = "00", g5 = "00", h5 = "00", 
        a4 = "00", b4 = "00", c4 = "00", d4 = "00", e4 = "00", f4 = "00", g4 = "00", h4 = "00", 
        a3 = "00", b3 = "00", c3 = "00", d3 = "00", e3 = "00", f3 = "00", g3 = "00", h3 = "00", 
        a2 = "09", b2 = "10", c2 = "11", d2 = "12", e2 = "13", f2 = "14", g2 = "15", h2 = "16", 
        a1 = "01", b1 = "02", c1 = "03", d1 = "04", e1 = "05", f1 = "06", g1 = "07", h1 = "08" 
    )

    newboard = rbind(newbord, board)
    i = 0

    for (move in moves){
        i = i + 1
        if (i==1){
            #number of play
        } else if (i==2){
            #White is moving
        } else if (i == 3) {
            #black is moving
            i = 0
        }

        #don't forget to review hierarchy and precedence of moves
        if (str_detect(move, "[a-z][1-8]")) {
            #pawn is moving
        } else if (str_detect(move, "[a-h][x][a-h][1-8]")) {
            #pawn is capturing 
        } else if (str_detect(move, "[K|Q|R|B|N][a-h][1-8]"){
            #King, Queen, Rock, Bishop or Knight is moving
        } else if (str_detect(move, "[K|Q|R|B|N][x][a-h][1-8]"){
            #King, Queen, Rock, Bishop or Knight is capturing
        } else if (move == "O-O") {
            #short castling
        } else if (move == "O-O-O") {
            #long castling
        }
    }
}