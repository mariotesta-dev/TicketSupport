class Matrix(private val matrixAsString: String) {

    // Matrix is defined as "1 2 \n 3 4"
    private val mat = matrixAsString.split("\r?\n|\r".toRegex())
        .map { it.split(" ")
            .map { v -> v.toInt() } }


    fun column(colNr: Int): List<Int> {
        val col : MutableList<Int> = ArrayList()
        mat.forEach { col.add(it[colNr - 1]) }
        return col
    }

    fun row(rowNr: Int): List<Int> {
        return mat[rowNr-1]
    }
}
