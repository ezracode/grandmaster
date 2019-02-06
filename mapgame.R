if (!require(stringr)) {
    install.packages("stringr")
    library(stringr)
}

if (!require(rlist)) {
    install.packages("rlist")
    library(rlist)
}

if (!require(dplyr)) {
    install.packages("dplyr")
    library(dplyr)
}

whiteDiagonals = list (
    d1 = list("a2", "b1"),
    d2 = list("a4", "b3", "c2", "d1"),
    d3 = list("a6", "b5", "c4", "d3", "e2", "f1"),
    d4 = list("a8", "b7", "c6", "d5", "e4", "f3", "g2", "h1"),
    d5 = list("c8", "d7", "e6", "f5", "g4", "h3"),
    d6 = list("e8", "f7", "g6", "h5"),
    d7 = list("g8", "h7"),
    d8 = list("a6", "b7", "c8"),
    d9 = list("a4", "b5", "c6", "d7", "e8"),
    d10 = list("a2", "b3", "c4", "d5", "e6", "f7", "g8"),
    d11 = list("b1", "c2", "d3", "e4", "f5", "g6", "h7"),
    d12 = list("d1", "e2", "f3", "g4", "h5"),
    d13 = list("f1", "g2", "h3")
)

blackDiagonals = list (
    d1 = list("a7", "b8"),
    d2 = list("a5", "b6", "c7", "d8"),
    d3 = list("a3", "b4", "c5", "d6", "e7", "f8"),
    d4 = list("a1", "b2", "c3", "d4", "e5", "f6", "g7", "h8"),
    d5 = list("c1", "d2", "e3", "f4", "g5", "h6"),
    d6 = list("e1", "f2", "g3", "h4"),
    d7 = list("g1", "h2"),
    d8 = list("a3", "b2", "c1"),
    d9 = list("a5", "b4", "c3", "d2", "e1"),
    d10 = list("a7", "b6", "c5", "d4", "e3", "f2", "g1"),
    d11 = list("b8", "c7", "d6", "e5", "f4", "g3", "h2"),
    d12 = list("d8", "e7", "f6", "g5", "h4"),
    d13 = list("f8", "g7", "h6")
)

colorOfCell <- function(file, rank){
#rank is a number, file is a letter
#file even and rank even black - columna impar fila impar negro
#file even and rank odd  white - columna impar fila par   blanco
#file odd  and rank even white - columna par   fila impar blanco
#file odd  and rank odd  black - columna par   fila par   negro
    if (file %in% list("a", "c", "d", "g")) {
        if( (strtoi(rank) %% 2) != 0 ) {
            return ("B")
        } else {
            return ("W")
        }
    } else {
        if( (strtoi(rank) %% 2) != 0 ) {
            return ("W")
        } else {
            return ("B")
        }
    }
}

setOfPieces = list (
    blr = list(kind = "R", color = "B", named = "black left rock",         code = "41", current.position = "a8", previous.position = "", counter.of.moves = 0),
    bln = list(kind = "N", color = "B", named = "black left knight",       code = "42", current.position = "b8", previous.position = "", counter.of.moves = 0),
    blb = list(kind = "B", color = "B", named = "black left bishop",       code = "43", current.position = "c8", previous.position = "", counter.of.moves = 0),
    bq  = list(kind = "Q", color = "B", named = "black queen",             code = "44", current.position = "d8", previous.position = "", counter.of.moves = 0),
    bk  = list(kind = "K", color = "B", named = "black king",              code = "45", current.position = "e8", previous.position = "", counter.of.moves = 0),
    brb = list(kind = "B", color = "B", named = "black left bishop",       code = "46", current.position = "f8", previous.position = "", counter.of.moves = 0),
    brn = list(kind = "N", color = "B", named = "black left knight",       code = "47", current.position = "g8", previous.position = "", counter.of.moves = 0),
    brr = list(kind = "R", color = "B", named = "black left rock",         code = "48", current.position = "h8", previous.position = "", counter.of.moves = 0),

    bp1 = list(kind = "P", color = "B", named = "black pawn left rock",    code = "31", current.position = "a7", previous.position = "", counter.of.moves = 0),
    bp2 = list(kind = "P", color = "B", named = "black pawn left knight",  code = "32", current.position = "b7", previous.position = "", counter.of.moves = 0),
    bp3 = list(kind = "P", color = "B", named = "black pawn left bishop",  code = "33", current.position = "c7", previous.position = "", counter.of.moves = 0),
    bp4 = list(kind = "P", color = "B", named = "black pawn queen",        code = "34", current.position = "d7", previous.position = "", counter.of.moves = 0),
    bp5 = list(kind = "P", color = "B", named = "black pawn king",         code = "35", current.position = "e7", previous.position = "", counter.of.moves = 0),
    bp6 = list(kind = "P", color = "B", named = "black pawn left bishop",  code = "36", current.position = "f7", previous.position = "", counter.of.moves = 0),
    bp7 = list(kind = "P", color = "B", named = "black pawn left knight",  code = "37", current.position = "g7", previous.position = "", counter.of.moves = 0),
    bp8 = list(kind = "P", color = "B", named = "black pawn left rock",    code = "38", current.position = "h7", previous.position = "", counter.of.moves = 0),

    wp1 = list(kind = "P", color = "W", named = "white pawn left rock",    code = "21", current.position = "a2", previous.position = "", counter.of.moves = 0),
    wp2 = list(kind = "P", color = "W", named = "white pawn left knight",  code = "22", current.position = "b2", previous.position = "", counter.of.moves = 0),
    wp3 = list(kind = "P", color = "W", named = "white pawn left bishop",  code = "23", current.position = "c2", previous.position = "", counter.of.moves = 0),
    wp4 = list(kind = "P", color = "W", named = "white pawn queen",        code = "24", current.position = "d2", previous.position = "", counter.of.moves = 0),
    wp5 = list(kind = "P", color = "W", named = "white pawn king",         code = "25", current.position = "e2", previous.position = "", counter.of.moves = 0),
    wp6 = list(kind = "P", color = "W", named = "white pawn left bishop",  code = "26", current.position = "f2", previous.position = "", counter.of.moves = 0),
    wp7 = list(kind = "P", color = "W", named = "white pawn left knight",  code = "27", current.position = "g2", previous.position = "", counter.of.moves = 0),
    wp8 = list(kind = "P", color = "W", named = "white pawn left rock",    code = "28", current.position = "h2", previous.position = "", counter.of.moves = 0),

    wlr = list(kind = "R", color = "W", named = "white left rock",         code = "11", current.position = "a1", previous.position = "", counter.of.moves = 0),
    wln = list(kind = "N", color = "W", named = "white left knight",       code = "12", current.position = "b1", previous.position = "", counter.of.moves = 0),
    wlb = list(kind = "B", color = "W", named = "white left bishop",       code = "13", current.position = "c1", previous.position = "", counter.of.moves = 0),
    wq  = list(kind = "Q", color = "W", named = "white queen",             code = "14", current.position = "d1", previous.position = "", counter.of.moves = 0),
    wk  = list(kind = "K", color = "W", named = "white king",              code = "15", current.position = "e1", previous.position = "", counter.of.moves = 0),
    wrb = list(kind = "B", color = "W", named = "white left bishop",       code = "16", current.position = "f1", previous.position = "", counter.of.moves = 0),
    wrn = list(kind = "N", color = "W", named = "white left knight",       code = "17", current.position = "g1", previous.position = "", counter.of.moves = 0),
    wrr = list(kind = "R", color = "W", named = "white left rock",         code = "18", current.position = "h1", previous.position = "", counter.of.moves = 0)
)

pieces = data.frame(stringsAsFactors = FALSE)
for (row in setOfPieces){
    pieces = rbind(pieces, row, stringsAsFactors = FALSE)
}

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

findRock <- function(pfile, prank, listOfRocks) {
    for (i in 1:nrow(listOfRocks)) {
        Rock <- listOfRocks[i, ]
        position = Rock[["current.position"]]    
        file = substr(position, nchar(position) - 1, nchar(position) - 1)
        rank = substr(position, nchar(position), nchar(position))
        if (pfile == file | prank == rank) {
            return(Rock)
        }
    } 
    return (NULL)
}

findBishop <- function(move, listOfBishops, diagonals) {
    for (i in 1:nrow(listOfBishops)){
        Bishop <- listOfBishops[i, ]
        position = Bishop[["current.position"]]    
        for (row in diagonals) {
            if (move %in% row & position %in% row){
                return(Bishop)
            }
        }
    } 
    return (NULL)
}

findKnight <- function(pfile, prank, listOfKnights) {
    files = c("a", "b", "c", "d", "e", "f", "g")
    pfilenumeric <- match(pfile, files)

    for (i in 1:nrow(listOfKnights)) {
        Knight <- listOfKnights[i, ]
        position = Knight[["current.position"]]    

        ## left and down
        if ((pfilenumeric - 2) >= 1 & (strtoi(prank) - 1) >= 1) {
            posiblePosition = paste(files[pfilenumeric - 2], toString(strtoi(prank) - 1), sep = "")
            if (position == posiblePosition){
                return(Knight)
            }
        }
        if ((pfilenumeric - 1) >= 1 & (strtoi(prank) - 2) >= 1) {
            posiblePosition = paste(files[pfilenumeric - 1], toString(strtoi(prank) - 2), sep = "")
            if (position == posiblePosition){
                return(Knight)
            }
        }

        ## left and upper
        if ((pfilenumeric - 2) >= 1 & (strtoi(prank) + 1) <= 8) {
            posiblePosition = paste(files[pfilenumeric - 2], toString(strtoi(prank) + 1), sep = "")
            if (position == posiblePosition){
                return(Knight)
            }
        }
        if ((pfilenumeric - 1) >= 1 & (strtoi(prank) + 2) <= 8) {
            posiblePosition = paste(files[pfilenumeric - 1], toString(strtoi(prank) + 2), sep = "")
            if (position == posiblePosition){
                return(Knight)
            }
        }

        ## right and upper
        if ((pfilenumeric + 1) <= 8 & (strtoi(prank) + 2) <= 8) {
            posiblePosition = paste(files[pfilenumeric + 1], toString(strtoi(prank) + 2), sep = "")
            if (position == posiblePosition){
                return(Knight)
            }
        }
        if ((pfilenumeric + 2) <= 8 & (strtoi(prank) + 1) <= 8) {
            posiblePosition = paste(files[pfilenumeric + 2], toString(strtoi(prank) + 1), sep = "")
            if (position == posiblePosition){
                return(Knight)
            }
        }

        ## right and down
        if ((pfilenumeric + 1) <= 8 & (strtoi(prank) - 2) >= 1) {
            posiblePosition = paste(files[pfilenumeric + 1], toString(strtoi(prank) - 2), sep = "")
            if (position == posiblePosition){
                return(Knight)
            }
        }
        if ((pfilenumeric + 2) <= 8 & (strtoi(prank) - 1) >= 1) {
            posiblePosition = paste(files[pfilenumeric + 2], toString(strtoi(prank) - 1), sep = "")
            if (position == posiblePosition){
                return(Knight)
            }
        }
    } 
    return (NULL)
}

findQueen <- function(pfile, prank, move, listOfQueens, diagonals) {
    for (i in 1:nrow(listOfQueens)){
        Queen <- listOfQueens[i, ]
        position = Queen[["current.position"]]    

        file = substr(position, nchar(position) - 1, nchar(position) - 1)
        rank = substr(position, nchar(position), nchar(position))
        if (pfile == file | prank == rank) {
            return(Queen)
        }

        for (row in diagonals) {
            if (move %in% row & position %in% row){
                return(Queen)
            }
        }
    } 
    return (NULL)
}

myBoard <- function(movetext) {
    moves <- unlist(strsplit(movetext, " "))

    newboard = data.frame(stringsAsFactors = FALSE)
    newboard = rbind(newboard, board, stringsAsFactors = FALSE)
    i = 0

    for (move in moves) {
        print (move)
        i = i + 1
        #don't forget to review hierarchy and precedence of moves
        if (str_detect(move, "[a-h][x][a-h][1-8]")) {
            #pawn is capturing 
            file = substr(move, nchar(move) - 1, nchar(move) - 1)
            rank = substr(move, nchar(move), nchar(move))
            previous.file = substr(move, 1, 1)
            current.move = paste(file,rank, sep = "")
            if (i == 2) {
                #White pawns                    
                previous.rank = toString(strtoi(rank) - 1)
                previous.move = paste(previous.file, previous.rank, sep = "")
                pawnValue = strtoi(board[[previous.move]])
                if (pawnValue >= 21 & pawnValue <= 28) {
                    board[[current.move]] = board[[previous.move]]
                    board[[previous.move]] = "00"
                }
            } else if (i == 3) {
                #Black pawns                    
                previous.rank = toString(strtoi(rank) + 1)
                previous.move = paste(previous.file, previous.rank, sep = "")
                pawnValue = strtoi(board[[previous.move]])
                if (pawnValue >= 31 & pawnValue <= 38) {
                    board[[current.move]] = board[[previous.move]]
                    board[[previous.move]] = "00"
                }
            }
            #updating piece values
            pieces$current.position[pieces$code == toString(pawnValue)] <<- current.move
            pieces$previous.position[pieces$code == toString(pawnValue)] <<- previous.move
            pieces$counter.of.moves[pieces$code == toString(pawnValue)] <<- pieces$counter.of.moves[pieces$code == toString(pawnValue)] + 1 

            #Adding current move
            newboard = rbind(newboard, board, stringsAsFactors = FALSE)
        } else if (str_detect(move, "[K|Q|R|B|N][a-h][1-8]")) {
            #King, Queen, Rock, Bishop or Knight is moving
            file = substr(move, nchar(move) - 1, nchar(move) - 1)
            rank = substr(move, nchar(move), nchar(move))
            piece = substr(move, 1, 1)
            current.move = paste(file, rank, sep = "")

            if (piece == "R") {
                #Rock is moving
                print("Rock is moving")
                if (i == 2){
                #White  
                    listOfRocks <- 
                        pieces %>% 
                        select(kind, color, named, code, current.position, previous.position, counter.of.moves) %>%
                        filter(kind == "R" & color == "W")
                } else if (i == 3) {
                #Black
                    listOfRocks <- 
                        pieces %>% 
                        select(kind, color, named, code, current.position, previous.position, counter.of.moves) %>%
                        filter(kind == "R" & color == "B")
                }
                Rock = findRock(file, rank, listOfRocks)
                previous.move = Rock$current.position               
                rockValue = strtoi(board[[previous.move]])

                board[[current.move]] = board[[previous.move]]
                board[[previous.move]] = "00"

                #updating piece values
                pieces$current.position[pieces$code == toString(rockValue)] <<- current.move
                pieces$previous.position[pieces$code == toString(rockValue)] <<- previous.move
                pieces$counter.of.moves[pieces$code == toString(rockValue)] <<- pieces$counter.of.moves[pieces$code == toString(rockValue)] + 1 

                #Adding current move
                newboard = rbind(newboard, board, stringsAsFactors = FALSE)
            } else if (piece == "B") {
                #Bishop is moving
                print("Bishop is moving")
                if (i == 2){
                #White  
                    listOfBishops <- 
                        pieces %>% 
                        select(kind, color, named, code, current.position, previous.position, counter.of.moves) %>%
                        filter(kind == "B" & color == "W")
                } else if (i == 3) {
                #Black
                    listOfBishops <- 
                        pieces %>% 
                        select(kind, color, named, code, current.position, previous.position, counter.of.moves) %>%
                        filter(kind == "B" & color == "B")
                }

                if (colorOfCell(file, rank) == "W") {
                    diagonals <- whiteDiagonals
                } else {
                    diagonals <- blackDiagonals
                }

                Bishop = findBishop(current.move, listOfBishops, diagonals)
                previous.move = Bishop$current.position               
                bishopValue = strtoi(board[[previous.move]])

                board[[current.move]] = board[[previous.move]]
                board[[previous.move]] = "00"

                #updating piece values
                pieces$current.position[pieces$code == toString(bishopValue)] <<- current.move
                pieces$previous.position[pieces$code == toString(bishopValue)] <<- previous.move
                pieces$counter.of.moves[pieces$code == toString(bishopValue)] <<- pieces$counter.of.moves[pieces$code == toString(bishopValue)] + 1 

                #Adding current move
                newboard = rbind(newboard, board, stringsAsFactors = FALSE)
            } else if (piece == "N") {
                #Rock is moving
                print("Knight is moving")
                if (i == 2){
                #White  
                    listOfKnights <- 
                        pieces %>% 
                        select(kind, color, named, code, current.position, previous.position, counter.of.moves) %>%
                        filter(kind == "N" & color == "W")
                } else if (i == 3) {
                #Black
                    listOfKnights <- 
                        pieces %>% 
                        select(kind, color, named, code, current.position, previous.position, counter.of.moves) %>%
                        filter(kind == "N" & color == "B")
                }
                Knight = findKnight(file, rank, listOfKnights)
                previous.move = Knight$current.position               
                knightValue = strtoi(board[[previous.move]])

                board[[current.move]] = board[[previous.move]]
                board[[previous.move]] = "00"

                #updating piece values
                pieces$current.position[pieces$code == toString(knightValue)] <<- current.move
                pieces$previous.position[pieces$code == toString(knightValue)] <<- previous.move
                pieces$counter.of.moves[pieces$code == toString(knightValue)] <<- pieces$counter.of.moves[pieces$code == toString(knightValue)] + 1 

                #Adding current move
                newboard = rbind(newboard, board, stringsAsFactors = FALSE)
            } else if (piece == "Q") {
                #Queen is moving
                print("Queen is moving")
                if (i == 2){
                #White  
                    listOfQueens <- 
                        pieces %>% 
                        select(kind, color, named, code, current.position, previous.position, counter.of.moves) %>%
                        filter(kind == "Q" & color == "W")
                } else if (i == 3) {
                #Black
                    listOfQueens <- 
                        pieces %>% 
                        select(kind, color, named, code, current.position, previous.position, counter.of.moves) %>%
                        filter(kind == "Q" & color == "B")
                }

                if (colorOfCell(file, rank) == "W") {
                    diagonals <- whiteDiagonals
                } else {
                    diagonals <- blackDiagonals
                }

                Queen = findQueen(file, rank, current.move, listOfQueens, diagonals)
                previous.move = Queen$current.position               
                queenValue = strtoi(board[[previous.move]])

                board[[current.move]] = board[[previous.move]]
                board[[previous.move]] = "00"

                #updating piece values
                pieces$current.position[pieces$code == toString(queenValue)] <<- current.move
                pieces$previous.position[pieces$code == toString(queenValue)] <<- previous.move
                pieces$counter.of.moves[pieces$code == toString(queenValue)] <<- pieces$counter.of.moves[pieces$code == toString(queenValue)] + 1 

                #Adding current move
                newboard = rbind(newboard, board, stringsAsFactors = FALSE)
            }
        } else if (str_detect(move, "[a-h][1-8]")) {
            #pawn is moving
            file = substr(move, nchar(move) - 1, nchar(move) - 1)
            rank = substr(move, nchar(move), nchar(move))
            current.move = move
            if (i == 2) {
                #White pawns                    
                previous.move = paste(file, toString(strtoi(rank) - 1), sep = "")
                pawnValue = strtoi(board[[previous.move]])
                if (pawnValue >= 21 & pawnValue <= 28) {
                    board[[current.move]] = board[[previous.move]]
                    board[[previous.move]] = "00"
                } else {
                    previous.move = paste(file, toString(strtoi(rank) - 2), sep = "")
                    pawnValue = strtoi(board[[previous.move]])
                    board[[current.move]] = board[[previous.move]]
                    board[[previous.move]] = "00"
                }
            } else if (i == 3) {
                #Black pawns                    
                previous.move = paste(file, toString(strtoi(rank) + 1), sep = "")
                pawnValue = strtoi(board[[previous.move]])
                if (pawnValue >= 31 & pawnValue <= 38) {
                    board[[current.move]] = board[[previous.move]]
                    board[[previous.move]] = "00"
                } else {
                    previous.move = paste(file, toString(strtoi(rank) + 2), sep = "")
                    pawnValue = strtoi(board[[previous.move]])
                    board[[current.move]] = board[[previous.move]]
                    board[[previous.move]] = "00"
                }
            }
            #updating piece values
            pieces$current.position[pieces$code == toString(pawnValue)] <<- current.move
            pieces$previous.position[pieces$code == toString(pawnValue)] <<- previous.move
            pieces$counter.of.moves[pieces$code == toString(pawnValue)] <<- pieces$counter.of.moves[pieces$code == toString(pawnValue)] + 1 

            #Adding current move
            newboard = rbind(newboard, board, stringsAsFactors = FALSE)
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