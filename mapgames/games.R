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

current.game = "1. e4 e5 2. d4 d5 3. exd5 exd4 4. a4 a5 5. b4 b5 6. axb5 bxa4 7. Ra4 Ra5 8. Ra3 Ra6 9. Bh6 Bh3 10. Bc4 Bc5 11. Bg5 Bg4 12. Bh4 Bh5 13. Nf3 Nf6 14. Nc3 Nc6 15. Qd2 Qd7 16. Qf4 Qf5 17. Qg3 Qg6 18. Qg4 Qg5"
w <- myBoard(current.game)

current.game = "1. e4 e5 2. d4 d5 3. exd5 exd4 4. a4 a5 5. b4 b5 6. axb5 bxa4 7. Ra4 Ra5 8. Ra3 Ra6 9. Bh6 Bh3 10. Bc4 Bc5 11. Bg5 Bg4 12. Bh4 Bh5 13. Nf3 Nf6 14. Nc3 Nc6 15. Qd2 Qd7 16. Qf4 Qf5 17. Qg3 Qg6 18. Qg4 Qg5 19. Kd1 Kd8 20. Kd2 Kd7"
w <- myBoard(current.game)

current.game = "1. Nf3 Nf6 2. e4 e5 3. Be2 Be7 4. O-O O-O"
w <- myBoard(current.game)

current.game = "1. Nc3 Nc6 2. d4 d5 3. Bd2 Bd7 4. O-O-O O-O-O"
w <- myBoard(current.game)