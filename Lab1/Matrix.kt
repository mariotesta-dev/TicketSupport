class Matrix(private val matrixAsString: String) {

    val cleaned_math = matrixAsString.split("\r?\n|\r".toRegex()).map { it.split(" ").map{ v -> v.toInt()}}

    fun column(colNr: Int): List<Int> {
        val l = mutableListOf<Int>()
        for (row in cleaned_math) {
            l.add(row[colNr-1])
        }
        return l.toList()
    }

    fun row(rowNr: Int): List<Int> {
        println(cleaned_math)
        return cleaned_math[rowNr-1]
    }
}
