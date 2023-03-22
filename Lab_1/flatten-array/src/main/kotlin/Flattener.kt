object Flattener {
    fun flatten(source: Collection<Any?>): List<Any> {
        return flat(source)
    }

    private fun flat(src: Collection<Any?>): List<Any> {

        val flattenedList = src.flatMap { el ->
            if(el is List<*>) flat(el) else listOf(el)
        }.filterNotNull()

        return flattenedList
    }
}


