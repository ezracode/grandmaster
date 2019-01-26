if(!require(bigchess)){
    install.packages("bigchess")
    library(bigchess)
}

games01 <- read.pgn("anand/5722.pgn")
games02 <- read.pgn("anand/5724.pgn")
games03 <- read.pgn("anand/77352.pgn")
games <- merge(games01, games02, games03)

games <- unique(games)