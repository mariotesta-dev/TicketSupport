object WordCount {

    fun phrase(phrase: String): Map<String, Int> {
        val wordCount = mutableMapOf<String,Int>()
        val cleanedPhrase = "([a-z0-9]+'[a-z0-9]+)|([a-z0-9]+)".toRegex()
                            .findAll(phrase.lowercase())

        cleanedPhrase.forEach {
            wordCount[it.value] = wordCount.getOrDefault(it.value,0) + 1
        }

        return wordCount
    }
}
