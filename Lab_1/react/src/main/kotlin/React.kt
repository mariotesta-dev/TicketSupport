import kotlin.properties.Delegates

class Reactor<T> {
    interface Subscription {
        fun cancel()
    }

    // A cell has a value, and notifies observers when the value changes.
    abstract inner class Cell(startingValue: T) {
        private val subscribers = mutableListOf<(T) -> Unit>()

        var value: T by Delegates.observable(startingValue) { _, previousValue, nextValue ->
            if (previousValue != nextValue)
                subscribers.forEach { it.invoke(nextValue) } // only when the value changes
        }


        open fun addCallback(callback: (T) -> Unit): Subscription {
            val sub = object : Subscription {
                override fun cancel() {
                    subscribers.remove(callback)
                }
            }
            subscribers += callback
            return sub
        }

    }

    inner class InputCell(value: T) : Cell(value)

    // A ComputeCell depends on other cells, that can be InputCells or other ComputeCells
    inner class ComputeCell(private vararg val inputs: Reactor<T>.Cell, private val computation: (List<T>) -> T) : Cell(inputs[0].value) {

        private val inputCells: Set<InputCell> = findInputCells()
        private var subscriptions: List<Subscription> = emptyList()

        // This will be fired together with the primary constructor
        init {
            update(value) // set the value once
            subscriptions = inputCells.map { it.addCallback(::update) } // ::update is a function reference
        }

        private fun update(newValue: T) {
            value = computation.invoke(inputs.map { it.value })
        }

        private fun findInputCells(): Set<InputCell> {
            fun recursiveFindInputCells(cell: Cell): List<InputCell> {
                return when (cell) {
                    is ComputeCell -> cell.inputCells.flatMap { recursiveFindInputCells(it) }
                    is InputCell -> listOf(cell)
                    else -> throw Error("Error")
                }
            }
            return inputs.flatMap { recursiveFindInputCells(it) }.toSet()
        }
    }
}
