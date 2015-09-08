// javascriptにQueueはないらしいのでここで実装していきます 参考URL：http://keicode.com/script/scr25.php 2014.7.21付

function Queue(){
	this._a = new Array();
}
Queue.prototype.enqueue = function(o){
	this._a.push(o);
}
Queue.prototype.dequeue = function(){
	if(this._a.length > 0){
		return this._a.shift();
	}
}
Queue.prototype.size = function(){
	return this._a.length;
}