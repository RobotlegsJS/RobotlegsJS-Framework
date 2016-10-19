import { ISlot } from "./ISlot";
import { OnceSignal } from "./OnceSignal";

    export class Promise extends OnceSignal
    {
        private isDispatched:boolean;
        private valueObjects:any[];

        /** @inheritDoc */
        /*override*/ public addOnce(listener:Function):ISlot
        {
            var slot:ISlot = super.addOnce(listener);
            if (this.isDispatched)
            {
                slot.execute(this.valueObjects);
                slot.remove();
            }

            return slot;
        }

        /**
         * @inheritDoc
         * @throws flash.errors.IllegalOperationError <code>IllegalOperationError</code>: You cannot dispatch() a Promise more than once
         */
        /*override*/ public dispatch(...valueObjects):void
        {
            if (this.isDispatched)
            {
                throw new Error("You cannot dispatch() a Promise more than once");
            }
            else
            {
                this.isDispatched = true;
                this.valueObjects = valueObjects;
                super.dispatch.apply(this, valueObjects);
            }
        }
    }

