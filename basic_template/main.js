// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

// Creates a new 'main' state that wil contain the game
var main_state = {

    preload: function() { 
		// Function called first to load all the assets
		this.game.stage.backgroundColor = '#71c5cf';
		this.game.load.image('bird','assets/bird.png');
		this.game.load.image('pipe', 'assets/pipe.png');
    },

    create: function() { 
    	// Fuction called after 'preload' to setup the game    
    	this.bird = this.game.add.sprite(100, 245, 'bird');
    	this.bird.body.gravity.y = 1000;
    	this.pipes = game.add.group();
    	this.pipes.createMultiple(20, 'pipe');

    	var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    	space_key.onDown.add(this.jump, this);
    	this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);
    },
    
    update: function() {
		// Function called 60 times per second
		if(this.bird.inWorld == false)
			this.restart_game();
    },


	jump: function() {
		this.bird.body.velocity.y = -350;
	},

	restart_game: function() {
		this.game.time.events.remove(this.timer);
		this.game.state.start('main');
	},

	add_one_pipe: function(x, y) {
		var pipe = this.pipes.getFirstDead();
		pipe.reset(x, y);
		pipe.body.velocity.x = -200;
		pipe.outOfBoundsKill = true;
	},

	add_row_of_pipes: function() {
		var hole = Math.floor(Math.random()*5)+1;

		for(var i=0; i < 8; i++) 
			if(i != hole && i != hole + 1) 
				this.add_one_pipe(400, i*60+10);
	},
};
// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 