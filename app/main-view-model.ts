import {Observable} from 'data/observable';

export class HelloWorldModel extends Observable {
    private _message: string;
    private _btnText: string;
    private refreshTimer: number;
    private isRunning: boolean;

    public get message(): string {
        return this._message;
    }

    public set buttonText(value: string) {
        this._btnText = value;
        this.notifyPropertyChange("buttonText", value);
    }

    public get buttonText(): string {
        return this._btnText;
    }

    constructor() {
        super();
        this.isRunning = false;
        this.buttonText = "START";
    }

    public onTap() {
        if (this.isRunning) {            
            clearTimeout(this.refreshTimer);
            this.buttonText = "START";
            this.isRunning = false;
        } else {
            this.isRunning = true;
            this.refreshText();
            this.buttonText = "STOP";
        }
    }

    private refreshText() {
        clearTimeout(this.refreshTimer);

        let rand = Math.random();
        let url = `http://loripsum.net/api/50/short/plaintext?cacheBust=${rand}`;

        fetch(url)
            .then((result) => {
                return result.text();
            })
            .then((text) => {
                this._message = text;
                this.notifyPropertyChange("message", this._message);

                this.refreshTimer = setTimeout(() => {
                    this.refreshText();
                }, 1000);
            })
            .catch((err) => {
                console.warn("Something went wrong querying the API");
                this._message = `ERROR: ${err}`;
                this.notifyPropertyChange("message", this._message);
            });
    }
}