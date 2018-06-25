const _ = 0  // open
const X = -1 // wall
const V = 1  // viking
const S = 2  // spectre
const W = 3  // wyvern
const C = 100 // chest

const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40

var position = [17,9]

// 20 x 20 grid
const dungeon = [
    // 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9
    [X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X], // 0
    [X,_,_,_,X,_,_,_,_,_,_,_,_,_,_,X,_,_,_,X], // 1
    [X,_,S,_,X,_,X,X,X,_,_,X,X,X,_,X,_,S,_,X], // 2
    [X,_,_,_,X,_,X,_,_,_,_,_,_,X,_,X,_,_,_,X], // 3
    [X,X,_,X,X,_,X,_,W,_,_,C,_,X,_,X,X,_,X,X], // 4
    [X,_,_,_,_,_,X,_,_,_,_,_,_,X,_,_,_,_,_,X], // 5
    [X,_,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,X,_,X], // 6
    [X,_,_,_,_,_,_,X,_,_,_,_,X,_,_,_,X,X,_,X], // 7
    [X,_,S,_,X,_,_,X,_,S,_,_,_,_,X,_,_,_,_,X], // 8
    [X,_,_,_,X,_,_,X,_,_,_,_,X,X,X,X,X,_,_,X], // 9
    [X,X,X,X,X,X,_,_,_,_,_,_,X,_,_,_,X,_,_,X], // 10
    [X,_,_,_,_,X,X,X,_,_,_,_,X,_,S,_,X,_,_,X], // 11
    [X,_,X,_,_,X,_,_,_,_,_,X,X,X,_,X,X,X,X,X], // 12
    [X,_,X,_,_,X,_,X,X,X,X,X,_,_,_,_,_,_,_,X], // 13
    [X,_,X,_,_,_,_,X,_,_,_,X,_,_,_,_,_,_,_,X], // 14
    [X,_,X,X,X,X,X,X,X,_,X,X,X,X,X,X,X,_,X,X], // 15
    [X,_,_,X,_,_,_,X,_,_,_,X,_,_,X,_,_,_,_,X], // 16
    [X,_,_,X,_,S,_,_,_,V,_,_,_,_,_,_,_,S,_,X], // 17
    [X,_,_,_,_,_,_,X,_,_,_,X,_,_,X,_,_,_,_,X], // 18
    [X,X,X,X,X,X,X,X,X,_,X,X,X,X,X,X,X,X,X,X], // 19
];

function initGrid(dungeon){
    $('tr').each(function(y, tr){
	console.log(y, tr)
	$('td', tr).each(function(x, td){
	    var contents = dungeon[y][x]
	    if(contents == X){
		$(td).addClass('wall')

	    } else if(contents == V){
		$(td).addClass('viking')

	    } else if(contents == S){
		$(td).addClass('spectre')
		$(td).addClass('monster')

	    } else if(contents == W){
		$(td).addClass('wyvern')
		$(td).addClass('monster')

	    } else if(contents == C){
		$(td).addClass('chest')
	    }

	    if(contents != V){
		$(td).addClass('fog')
	    }
	})
    })
}

function getCell(y, x){
    var cell
    $('tr').each(function(i, tr){
	if(y == i){
	    $('td', tr).each(function(j, td){
		if(x == j){
		    cell = td
		}
	    })
	}
    })
    return cell
}

function clearFog(y, x){
    $(getCell(y, x)).removeClass('fog')
    $(getCell(y, x-1)).removeClass('fog')
    $(getCell(y, x+1)).removeClass('fog')
    $(getCell(y-1, x)).removeClass('fog')
    $(getCell(y-1, x-1)).removeClass('fog')
    $(getCell(y-1, x+1)).removeClass('fog')
    $(getCell(y+1, x)).removeClass('fog')
    $(getCell(y+1, x-1)).removeClass('fog')
    $(getCell(y+1, x+1)).removeClass('fog')
}

function combat(y,x){
    $(getCell(y, x)).removeClass('monster')
    $(getCell(y, x)).removeClass('spectre')
    $(getCell(y, x)).removeClass('wyvern')
    $(getCell(y, x)).addClass('attack')
    setTimeout(function(){
	$(getCell(y, x)).removeClass('attack')
    }, 200)
    
}

function move(e) {
    var key = e.which
    var y = position[0]
    var x = position[1]
    if(key == LEFT) {
	x -= 1
    } else if( key == UP){
	y -= 1
    } else if( key == RIGHT){
	x += 1
    } else if( key == DOWN){
	y += 1
    }

    var valid = true
    if(x < 0 || x >= 20 || y < 0 || y >= 20){
	valid = false

    } else if($(getCell(y, x)).hasClass('wall')){
	valid = false
	
    } else if($(getCell(y, x)).hasClass('monster')){
	valid = false
	combat(y, x)
    }

    if(valid){

	$(getCell(position[0], position[1])).removeClass('viking')
	$(getCell(y, x)).addClass('viking')
	clearFog(y, x)

	position[0] = y
	position[1] = x
    }

    e.preventDefault();
}

$(function(){
    initGrid(dungeon)
    $(document.body).keydown(move)
})
