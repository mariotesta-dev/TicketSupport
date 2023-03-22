class Matrix(private val matrixAsString: String) {

    private val m: List<List<Int>> =
      matrixAsString
          .split("\n")
          .map { it.replace("[ ]+".toRegex(), " ") }
          .map { it.split(" ").map { it.toInt() }.toList() }
          .toList()

  fun row(row: Int): List<Int> = m[row - 1]

  fun column(col: Int): List<Int> = m.map { it[col - 1] }
}
