/*
描述：
	一个8元素的循环队列。实现push和pop方法。  
	push方法入列时，如果队列满则覆盖最先入列的元素。  
	pop方法出列时，先进先出。 
例：
队列[1, 2, 3, 4, 5, 6, 7, 8]
push(9) // 入列9
[9, 2, 3, 4, 5, 6, 7, 8]
push(10) // 入列10
[9, 10, 3, 4, 5, 6, 7, 8]
pop() // 弹出3
[9, 10, /, 4, 5, 6, 7, 8]
pop() // 弹出4
[9, 10, /, /, 5, 6, 7, 8]
*/

const static_list = new Array(8);
const index_list = new Array(8);


function size(list) {
	let size = 0;
	for (let i = 0; i < list.length; i++) {
		if (list[i] !== undefined) size++;
	}
	return size;
}

function clear() {
	for (let i = 0; i < 8; i++) {
		pop();
	}
}
function find_empty(list) {
	const i = list.findIndex(item => item === undefined);
	return i;
}

function find_not_empty(list) {
	const i = list.findIndex(item => item !== undefined);
	return i;
}

function find_min_Index(list) {
	let min_index = find_not_empty(list);
	let min_val = list[min_index];
	for (let i = 0; i < list.length; i++) {
		if (list[i] !== undefined && list[i] < min_val) {
			min_val = list[i];
			min_index = i;
		}
	}
	return min_index;
}

function push(val) {
	const s = size(static_list);
	console.assert(s <= 8, "超长");
	if (s < 8) {
		const ei = find_empty(static_list);
		static_list[ei] = val;
		index_list[ei] = { val, order: s };
	}
	if (s === 8) {
		const ol = index_list.map(item => item.order);
		const mi = find_min_Index(ol);
		static_list[mi] = val;
		index_list.forEach(item => --item.order);
		index_list[mi] = { val, order: 7 };
	}
}

function pop() {
	const s = size(static_list);
	console.assert(s > 0, "列表为空");
	const ol = index_list.map(item => item?.order);
	const mi = find_min_Index(ol);
	static_list[mi] = undefined;
	index_list.forEach(item => {
		if (item && item.order !== undefined) {
			--item.order;
		}
	});
	index_list[mi] = undefined;
}


for (let i = 7; i >= 0; --i) {
	push(i);
}
console.log("staticList: ", static_list, '\n', "index_list: ", index_list);

for (let i = 0; i < 8; i++) {
	push(i);
}
console.log("staticList: ", static_list, '\n', "index_list: ", index_list);

clear();
console.log("staticList: ", static_list, '\n', "index_list: ", index_list);

push(9);
push(8);
pop();
push(100);
pop();
push(10);
pop();
push(20);
console.log("staticList: ", static_list, '\n', "index_list: ", index_list);

