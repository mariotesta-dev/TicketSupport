import kotlin.properties.Delegates
class Reactor<T> {
    interface Subscription {
        fun cancel()
    }
    // A cell has a value, and notifies observers when the value changes.
    abstract inner class Cell(initialValue: T) {
        private val subscribers = mutableListOf<(T) -> Unit>()

        var value: T by Delegates.observable(initialValue) { _, oldValue, newValue ->
            if (oldValue != newValue) // Only notify listeners when the value actually change
                subscribers.forEach { it.invoke(newValue) }
        }

        open fun addCallback(callback: (T) -> Unit): Subscription =
            object : Subscription {
                override fun cancel() {
                    subscribers.remove(callback)
                }
            }.also { subscribers += callback }
    }

    // An input cell has nothing special
    inner class InputCell(value: T) : Cell(value)

    // A ComputeCell depends on other cells, that can be InputCells or other ComputeCells
    inner class ComputeCell(private vararg val inputs: Reactor<T>.Cell, private val computation: (List<T>) -> T) : Cell(inputs[0].value) {
        private val inputCells: Set<InputCell> = findAllInputSources()
        private val inputCellsSubscription: List<Subscription>

        private fun findAllInputSources(): Set<InputCell> {
            fun findInputCellsRecursively(c: Cell): List<InputCell> = when (c) {
                is ComputeCell -> c.inputCells.flatMap { findInputCellsRecursively(it) }
                is InputCell -> listOf(c)
                else -> error("Unknown cell type '${c.javaClass.simpleName}'")
            }
            return inputs.flatMap { findInputCellsRecursively(it) }.toSet()
        }

        init {
            update(value) // set the value once
            /* We only want to listen to changes to the input cells (the sources of events).
            Since the callbacks are stored in a *list* and a ComputeCell needs to be initialized before being passed to another,
            we are sure this callback will be called *after* the callbacks of the other compute cells it depends on (which were registered
            before this one on the input source).
            In other words, we can only watch the inputs, and be sure the intermediary cells will have been updated beforehand.*/
            inputCellsSubscription = inputCells.map { it.addCallback(::update) }
        }

        private fun update(newValue: T) {
            value = computation.invoke(inputs.map { it.value })
        }

        protected fun finalize() {
            // Ensure we clean up before this compute cell is being garbage-collected.
            inputCellsSubscription.forEach { it.cancel() }
        }
    }
}
