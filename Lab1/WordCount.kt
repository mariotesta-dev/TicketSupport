object WordCount {

    fun phrase(phrase: String): Map<String, Int> {
        val finalMap = HashMap<String, Int>()
        return phrase.replace("[^\\w\']".toRegex(), " ").lowercase().trim().split("\\s+".toRegex()).fold(finalMap) { map, word ->
            var cleanWork = word.replace("^\'|\'$".toRegex(),"")
            map[cleanWork] = map.getOrDefault(cleanWork, 0) + 1
            map
        }
    }
}
