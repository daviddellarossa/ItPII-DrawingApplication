/**
 * This class manages the Chain of responsibility for the Filters.
 *
 * For more information about the rationale behind Filters and their usage, please look at the following:
 * [Filter]{@link Filter}
 * [MirrorFilter]{@link MirrorFilter}
 * [p5Proxy]{@link P5Proxy}
 */
class FilterManager {
    /** Return the chain of filters */
    get chain() {
        return this._chain;
    }
    /** Set the chain of filters */
    set chain(value) {
        if (this._chain === value) return;

        this._chain = value;
        //Observer pattern: notification that the chain has changed
        if (this.onChainChange) this.onChainChange();
    }

    /**
     * Create a new instance of FilterManager
     * @param {p5Instance} target - The instance of p5
     */
    constructor(target) {
        if (!(target instanceof p5)) {
            throw new Error("target is expected to be an instance of p5");
        }
        //Observer pattern: the observers (only one in this case) will be notified when the chain changes
        this.onChainChange = null;
        this.target = new Filter('p5Instance', target);
        this.chain = this.target;
    }

    /**
     * Add a filter at the beginning of the chain
     * @param {Filter} filter - Filter to add at the beginning of the chain
     */
    addFilter(filter) {
        if (!(filter instanceof Filter)) {
            throw new Error("filter is expected to be an instance of Filter");
        }

        filter.next = this.chain;
        this.chain = filter;
        filter.enable();
    }

    /**
     * Remove a filter from the chain
     * @param {Filter} filter - Filter to remove from the chain
     */
    removeFilter(filter) {
        if (!(filter instanceof Filter)) {
            throw new Error("filter is expected to be an instance of Filter");
        }
        filter.disable();
        //If the chain is made only by the target, then there is no filter to remove, return.
        if (this.chain === this.target) //cannot remove the target;
            return;
        //If the filter is at the beginning of the chain, remove the filter
        if (this.chain === filter) {
            this.chain = this.chain.next;

            return;
        }

        //If the filter is in the middle of the chain, find it and remove it
        let prev = this.chain;
        let next = this.chain.next;

        while (next !== this.target) { //cannot remove the target;
            if (next === filter) {
                prev.next = next.next;
                return;
            } else {
                prev = next;
                next = next.next;
            }
        }
    }
}