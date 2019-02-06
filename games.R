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

current.game = "1. e4 e5 2. d4 d5 3. exd5 exd4 4. a4 a5 5. b4 b5 6. axb5 bxa4 7. Ra4 Ra5 8. Ra3 Ra6"
w <- myBoard(current.game)

current.game = "1. e4 e5 2. d4 d5 3. exd5 exd4 4. a4 a5 5. b4 b5 6. axb5 bxa4 7. Ra4 Ra5 8. Ra3 Ra6 9. Bh6 Bh3 10. Bc4 Bc5 11. Bg5 Bg4 12. Bh4 Bh5"
w <- myBoard(current.game)

current.game = "1. e4 e5 2. d4 d5 3. exd5 exd4 4. a4 a5 5. b4 b5 6. axb5 bxa4 7. Ra4 Ra5 8. Ra3 Ra6 9. Bh6 Bh3 10. Bc4 Bc5 11. Bg5 Bg4 12. Bh4 Bh5 13. Nf3 Nf6 14. Nc3 Nc6"
w <- myBoard(current.game)
