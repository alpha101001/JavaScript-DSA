class promise {
    constructor(callback) {
        this.value = null;
        this.error = null;
        this.thenCallback = [];
        this.catchCallback = [];
        this.isResolved = false;
        this.isRejected = false;
        const resolve = (val) => {
            this.isResolved = true;
            this.value = val;
            if (this.thenCallback) {
                this.thenCallback.forEach((cb)=>cb(this.value));
            }
        };
        const reject = (err) => {
            this.isRejected = true;
            this.error = err;
            if(this.catchCallback){
                this.catchCallback.forEach((cb)=>cb(this.error));
            }
            
        };

        callback(resolve, reject);
    }

    then(callback) {
        return new Pact((resolve, reject) => {
            const handleThen = (val) => {
                try {
                    const result = callback(val);
                    if (result instanceof Pact) {
                        result.then(resolve).catch(reject);
                    } else if (result && typeof result.then === 'function') {
                        result.then(resolve).catch(reject);
                    } else {
                        resolve(result); 
                    }
                } catch (err) {
                    reject(err); 
                }
            };

            if (this.isResolved) {
                handleThen(this.value);
            } else {
                this.thenCallback.push(handleThen);
            }
        });
        
    }

    catch(callback) {
        return new Pact((resolve, reject) => {
            const handleCatch = (err) => {
                try {
                    const result = callback(err);
                    resolve(result); 
                } catch (err) {
                    reject(err);
                }
            };

            if (this.isRejected) {
                handleCatch(this.error);
            } else {
                this.catchCallback.push(handleCatch);
            }
        });
    }
}

module.exports = Pact;
