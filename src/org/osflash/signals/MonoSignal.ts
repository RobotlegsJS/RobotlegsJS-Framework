import { ISignal } from "./ISignal";
import { Slot } from "./Slot";
import { ISlot } from "./ISlot";

/**
 * Allows the valueClasses to be set in MXML, e.g.
 * <signals:Signal id="nameChanged">{[String, uint]}</signals:Signal>
 */
/*[DefaultProperty("valueClasses")]*/

/**
 * A MonoSignal can have only one listener.
 */
export class MonoSignal implements ISignal {
    protected _valueClasses: any[]; // of Class

    protected slot: Slot;

    /**
     * Creates a MonoSignal instance to dispatch value objects.
     * @param    valueClasses Any number of class references that enable type checks in dispatch().
     * For example, new Signal(String, uint)
     * would allow: signal.dispatch("the Answer", 42)
     * but not: signal.dispatch(true, 42.5)
     * nor: signal.dispatch()
     *
     * NOTE: Subclasses cannot call super.apply(null, valueClasses),
     * but this constructor has logic to support super(valueClasses).
     */
    constructor(...valueClasses) {
        // Cannot use super.apply(null, valueClasses), so allow the subclass to call super(valueClasses).
        this.valueClasses =
            valueClasses.length === 1 && valueClasses[0] instanceof Array
                ? valueClasses[0]
                : valueClasses;
    }

    /**
     * @inheritDoc
     * @throws ArgumentError <code>ArgumentError</code>: Invalid valueClasses argument: item at index should be a Class but was not.
     */
    /*[ArrayElementType("Class")]*/
    public get valueClasses(): any[] {
        return this._valueClasses;
    }

    public set valueClasses(value: any[]) {
        // Clone so the Array cannot be affected from outside.
        this._valueClasses = value ? value.slice() : [];
        for (let i: number = this._valueClasses.length; i--; ) {
            if (typeof this._valueClasses[i] !== "function") {
                throw new Error(
                    "Invalid valueClasses argument: " +
                        "item at index " +
                        i +
                        " should be a Class but was:<" +
                        this._valueClasses[i] +
                        "'>." +
                        this._valueClasses[i]
                ); // @CHANGED - temp replacement for getQualifiedClassByName()
            }
        }
    }

    /** @inheritDoc */
    public get numListeners(): number {
        return this.slot ? 1 : 0;
    }

    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot add or addOnce with a listener already added, remove the current listener first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     */
    public add(listener: Function): ISlot {
        return this.registerListener(listener);
    }

    /**
     * @inheritDoc
     * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot add or addOnce with a listener already added, remove the current listener first.
     * @throws ArgumentError <code>ArgumentError</code>: Given listener is <code>null</code>.
     */
    public addOnce(listener: Function): ISlot {
        return this.registerListener(listener, true);
    }

    /** @inheritDoc */
    public remove(listener: Function): ISlot {
        if (this.slot && this.slot.listener === listener) {
            let theSlot: ISlot = this.slot;
            this.slot = null;
            return theSlot;
        }

        return null;
    }

    /** @inheritDoc */
    public removeAll(): void {
        if (this.slot) {
            this.slot.remove();
        }
    }

    /**
     * @inheritDoc
     * @throws ArgumentError <code>ArgumentError</code>: Incorrect number of arguments.
     * @throws ArgumentError <code>ArgumentError</code>: Value object is not an instance of the appropriate valueClasses Class.
     */
    public dispatch(...valueObjects): void {
        // If valueClasses is empty, value objects are not type-checked.
        let numValueClasses: number = this._valueClasses.length;
        let numValueObjects: number = valueObjects.length;

        // Cannot dispatch fewer objects than declared classes.
        if (numValueObjects < numValueClasses) {
            throw new Error(
                "Incorrect number of arguments. " +
                    "Expected at least " +
                    numValueClasses +
                    " but received " +
                    numValueObjects +
                    "."
            );
        }

        // Cannot dispatch differently typed objects than declared classes.
        for (let i: number = 0; i < numValueClasses; i++) {
            // Optimized for the optimistic case that values are correct.
            if (
                valueObjects[i] === null ||
                (valueObjects[i] instanceof this._valueClasses[i] ||
                    valueObjects[i].constructor === this._valueClasses[i])
            ) {
                continue;
            }

            throw new Error(
                "Value object <" +
                    valueObjects[i] +
                    "> is not an instance of <" +
                    this._valueClasses[i] +
                    ">."
            );
        }

        // Broadcast to the one listener.
        if (this.slot) {
            this.slot.execute(valueObjects);
        }
    }

    protected registerListener(
        listener: Function,
        once: boolean = false
    ): ISlot {
        if (this.slot) {
            // If the listener exits previously added, definitely don't add it.
            throw new Error(
                "You cannot add or addOnce with a listener already added, remove the current listener first."
            );
        }

        return (this.slot = new Slot(listener, this, once));
    }
}
