class LinkedList {
    constructor(){
        this.head = null;
    }
    addFirst(node){
        node.next = this.head;
        this.head = node;
    }
    addLast(node){
        let tail=this.head;
        if(this.head===null){
            this.head = node;
        }else{
            while(tail.next){
            tail = tail.next;
            }
        tail.next = node;
        }
        node.next = null;
        
    }
    indexOf(node){
        let index=0;
        let current = this.head;
        while(current.next!==node.next){
            current=current.next;
            index++
        }
        return index;
    }
    removeAt(index){
        let current = this.head;
        if(current===null){
            return;
        }
        if(index===0){
            this.head=current.next;
            return;
        }
        let prev = null;
        let count = 0;
        while(current!==null && count<index){
            prev = current;
            current = current.next;
            count++;
        }
        if(current===null){
            return;
        }
        prev.next=current.next;

    }
}

module.exports = LinkedList;
