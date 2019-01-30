if(!require(stringr)){
    install.packages("stringr")
    library(stringr)
}

myBoard <- function(movetext) {
    moves <- unlist(strsplit(movetext, " "))

    newboard = data.frame(stringsAsFactors=FALSE)

    board = list (
        a8 = "41", b8 = "42", c8 = "43", d8 = "44", e8 = "45", f8 = "46", g8 = "47", h8 = "48", 
        a7 = "31", b7 = "32", c7 = "33", d7 = "34", e7 = "35", f7 = "36", g7 = "37", h7 = "38", 
        a6 = "00", b6 = "00", c6 = "00", d6 = "00", e6 = "00", f6 = "00", g6 = "00", h6 = "00", 
        a5 = "00", b5 = "00", c5 = "00", d5 = "00", e5 = "00", f5 = "00", g5 = "00", h5 = "00", 
        a4 = "00", b4 = "00", c4 = "00", d4 = "00", e4 = "00", f4 = "00", g4 = "00", h4 = "00", 
        a3 = "00", b3 = "00", c3 = "00", d3 = "00", e3 = "00", f3 = "00", g3 = "00", h3 = "00", 
        a2 = "21", b2 = "22", c2 = "23", d2 = "24", e2 = "25", f2 = "26", g2 = "27", h2 = "28", 
        a1 = "11", b1 = "12", c1 = "13", d1 = "14", e1 = "15", f1 = "16", g1 = "17", h1 = "18" 
    )

    newboard = rbind(newboard, board, stringsAsFactors=FALSE)
    i = 0

    for (move in moves) {
        i = i + 1
        #don't forget to review hierarchy and precedence of moves
        if (str_detect(move, "[a-h][1-8]")) {
            #pawn is moving
            rank = substr(move, nchar(move) - 1, nchar(move) - 1)
            file = substr(move, nchar(move), nchar(move))
            current.move = move
            if (i == 2) {
                #White pawns                    
                previous.move = paste(rank, toString(strtoi(file) - 1), sep = "")
                pawnValue = strtoi(board[[previous.move]])
                if (pawnValue >= 21 & pawnValue <= 28) {
                    board[[current.move]] = board[[previous.move]]
                    board[[previous.move]] = "00"
                } else {
                    previous.move = paste(rank, toString(strtoi(file) - 2), sep = "")
                    pawnValue = strtoi(board[[previous.move]])
                    board[[current.move]] = board[[previous.move]]
                    board[[previous.move]] = "00"
                }
                #Adding current move
                newboard = rbind(newboard, board, stringsAsFactors=FALSE)
            } else if (i == 3) {
                #Black pawns                    
                previous.move = paste(rank, toString(strtoi(file) + 1), sep = "")
                pawnValue = strtoi(board[[previous.move]])
                if (pawnValue >= 31 & pawnValue <= 38) {
                    board[[current.move]] = board[[previous.move]]
                    board[[previous.move]] = "00"
                } else {
                    previous.move = paste(rank, toString(strtoi(file) + 2), sep = "")
                    pawnValue = strtoi(board[[previous.move]])
                    board[[current.move]] = board[[previous.move]]
                    board[[previous.move]] = "00"
                }
                #Adding current move
                newboard = rbind(newboard, board, stringsAsFactors=FALSE)
            }
        } else if (str_detect(move, "[a-h][x][a-h][1-8]")) {
            #pawn is capturing 
            rank = substr(move, nchar(move) - 1, nchar(move) - 1)
            file = substr(move, nchar(move), nchar(move))
            previous.rank = substr(move, 1, 1)
            current.move = paste(rank, file)
            if (i == 2) {
                #White pawns                    
                previous.file = toString(strtoi(file) - 1)
                previous.move = paste(previous.rank, previous.file, sep = "")
                pawnValue = strtoi(board[[previous.move]])
                if (pawnValue >= 21 & pawnValue <= 28) {
                    board[[current.move]] = board[[previous.move]]
                    board[[previous.move]] = "00"

                    #Adding current move
                    newboard = rbind(newboard, board, stringsAsFactors=FALSE)
                }
            } else if (i == 3) {
                #Black pawns                    
                previous.file = toString(strtoi(file) + 1)
                previous.move = paste(previous.rank, previous.file, sep = "")
                pawnValue = strtoi(board[[previous.move]])
                if (pawnValue >= 31 & pawnValue <= 38) {
                    board[[current.move]] = board[[previous.move]]
                    board[[previous.move]] = "00"

                    #Adding current move
                    newboard = rbind(newboard, board, stringsAsFactors=FALSE)
                }
            }
        } else if (str_detect(move, "[K|Q|R|B|N][a-h][1-8]")) {
            #King, Queen, Rock, Bishop or Knight is moving
        } else if (str_detect(move, "[K|Q|R|B|N][x][a-h][1-8]")) {
            #King, Queen, Rock, Bishop or Knight is capturing
        } else if (move == "O-O") {
            #short castling
        } else if (move == "O-O-O") {
            #long castling
        }

        if (i == 3) {
            #black is moving
            i = 0
        }
    }

    return (newboard)
}