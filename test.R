equipos = list (
    UEFA = list(champion="Real Madrid", country = "España"), 
    CONCACAF = list(champion="America FC", country = "Mexico")
)

message <- function(championship){
    equipos[["UEFA"]]$champion <<- "FC Barcelona"
    print (equipos[["UEFA"]])
    return (paste(championship, "Mensaje recibido"))
}

piezas = list (
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

newboard = data.frame(stringsAsFactors = FALSE)

for (row in piezas){
    newboard = rbind(newboard, row, stringsAsFactors = FALSE)
}