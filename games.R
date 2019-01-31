if (!require(bigchess)) {
    install.packages("bigchess")
    library(bigchess)
}

source("mapgame.R")

games01 <- read.pgn("anand/5722.pgn")
games02 <- read.pgn("anand/5724.pgn")
games03 <- read.pgn("anand/77352.pgn")
games <- rbind(games01, games02, games03)

games <- unique(games)

current.game = "1. e4 e5 2. d4 d5 3. exd5 exd4"

w <- myBoard(current.game)