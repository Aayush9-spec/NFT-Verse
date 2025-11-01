import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { platform } from 'os';

export class Game1 extends Scene {
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars!: Phaser.Physics.Arcade.Group;
    private modal!: Phaser.GameObjects.Container;
    private score: number = 0;
    private groundTop!: Phaser.Physics.Arcade.StaticGroup;
    // private groundBottom!: Phaser.Physics.Arcade.StaticGroup;
    private modalElements!: any;

    constructor() {
        super('MainGame1');
    }

    preload() {
        this.load.setPath('assets');
        
        // Load game assets
        this.load.image('sky1', 'level2.png');
        this.load.image('ground-top', 'top.svg');
        // this.load.image('ground-bottom', 'botoom.svg');
        this.load.image('tile', '222.svg');  // Load the tile image
        this.load.image('1','1.svg');
        this.load.image('2','2.svg');
        this.load.image('3','3.svg')
        this.load.image('4','4.svg')
        this.load.image('8','8.svg')
        this.load.image('61','61.svg')
        this.load.image('62','62.svg')
        this.load.image('63','63.svg')
        this.load.image('71','71.svg')
        this.load.image('72','72.svg')
        this.load.image('L','L.png')
        this.load.image('M','M.png')
        this.load.image('N','N.png')
        this.load.image('O','O.png')
        this.load.image('P','P.png')
        this.load.image('l-2','l-2.png')
        this.load.image('r-2','r-2.png')
        this.load.image('t-2','t-2.png')
        this.load.image('question2', 'Q2normal.svg');
        this.load.image('hint2', 'Q2hint.svg');

        this.load.image('wizard', 'baba.png');
        this.load.image('arrow','arrow.svg')
        this.load.image('sage', 'rst.png');  // Using same image for now, you can replace with different image

        
        // Load player sprites
        this.load.image('still1', 'still1.png');
        this.load.image('still2', 'still2.png');
        this.load.image('walk1', 'walk1.png');
        this.load.image('walk2', 'walk2.png');
        this.load.image('jump1', 'jump1.png');
        this.load.image('jump2', 'jump2.png');
        this.load.image('jump3', 'jump3.png');
        
        
        this.load.image('collectible', 'star.png');
    }

    create() {
        // Get window dimensions
        const width = window.innerWidth;
        const height = window.innerHeight;
        console.log(width,height)
        // Add background
        const bg = this.add.image(width/2, height/2, 'sky1');
        bg.setDisplaySize(width, height );
        this.groundTop = this.physics.add.staticGroup();

        this.platforms = this.physics.add.staticGroup();

        // Create a single tile platform
        const platform1 = this.platforms.create(174,  565, '2');
        platform1.setScale(0.8).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform2 = this.platforms.create(1920-174,  565, '2');
        platform2.setScale(0.8).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform2.setFlipX(true); // Slightly transparent
        const platform3 = this.platforms.create(248,  263, '3');
        // 
        const platform4= this.platforms.create(1645,  263, '3');
       
        platform4.setFlipX(true); // Slightly transparent
        const platform5 = this.platforms.create(114,  890, '1');
       
        const platform6= this.platforms.create(1799,  890, '1');
     
        platform6.setFlipX(true); // Slightly transparent
        const platform7 = this.platforms.create(929,  838, '8');
        
        const platform8= this.platforms.create(985,  838, '8');
      
        platform8.setFlipX(true); // Slightly transparent
        const platform9= this.platforms.create(540,  404, '4');
       
        const platform10 = this.platforms.create(1379,  404, '4');
        platform10.setScale(1).refreshBody(); // Reduced scale
       // Slightly 
        platform10.setFlipX(true); // Slightly transparent
        const platform11 = this.platforms.create(955,  349, '62');
        platform11.setScale(0.8).refreshBody(); // Reduced scale
       
        platform11.setFlipX(true); // Slightly transparent
        const platform12 = this.platforms.create(857,  390, '61');
        platform12.setScale(0.8).refreshBody(); // Reduced scale
        platform12.setAlpha(1); // Slightly 
        const platform13= this.platforms.create(1054,  390, '63');
        platform13.setScale(0.8).refreshBody(); // Reduced scale
        const platform14 = this.platforms.create(717,  701, '72');
        // platform12.setScale(0.8).refreshBody(); // Reduced scale
        platform12.setAlpha(1); // Slightly 
        const platform15= this.platforms.create(481,  726, '71');
        // platform13.setScale(0.8).refreshBody(); // Reduced scale
        const platform16 = this.platforms.create(1196,  701, '72');
        // platform12.setScale(0.8).refreshBody(); // Reduced scale
        platform12.setAlpha(1); // Slightly 
        platform16.setFlipX(true); // Slightly transparent
        const platform17= this.platforms.create(1437,  726, '71');
        // platform13.setScale(0.8).refreshBody(); // Reduced scale
        platform17.setFlipX(true); // Slightly transparent

        // platform13.setFlipX(true); // Slightly transparent

        const platform18= this.platforms.create(355,  1055, 'L');
        platform18.setAlpha(0)
        const platform19= this.platforms.create(717,  1030, 'M');
        platform19.setAlpha(0)
        const platform20= this.platforms.create(956,  1055, 'N');
        platform20.setAlpha(0)
        const platform21= this.platforms.create(1196,  1030, 'O');
        platform21.setAlpha(0)
        const platform22= this.platforms.create(1556,  1055, 'P');
        platform22.setAlpha(0)
        const platform23=this.platforms.create(28,  540, 'l-2');
        platform23.setAlpha(0)
        const platform24=this.platforms.create(1891,  540, 'r-2');
        platform24.setAlpha(0)
        const platform25=this.platforms.create(956,  77, 't-2');
        platform25.setAlpha(0)

        



        // Create animations
        this.anims.create({
            key: 'idle',
            frames: [
                { key: 'still1' },
                { key: 'still2' }
            ],
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: [
                { key: 'walk1' },
                { key: 'walk2' }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: [
                { key: 'jump1' },
                { key: 'jump2' },
                { key: 'jump3' }
            ],
            frameRate: 8,
            repeat: 0
        });

        // Add player with improved spawn position
        this.player = this.physics.add.sprite(width * 0.1, height * 0.4, 'still1');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.085);
        
        // Start with idle animation
        this.player.play('idle');
        this.wizard = this.physics.add.sprite(540, 350, 'wizard');
        this.wizard.setBounce(0.1);
        this.wizard.setScale(0.12);
        this.wizard.setGravityY(300); 
        // this.wizard.setImmovable(true);
        this.wizard.setFlipX(true);
        // this.wizard.setCollideWorldBounds(true);
        this.targetZone = this.add.zone(1800 ,800, 100, 100);
        this.physics.world.enable(this.targetZone, Phaser.Physics.Arcade.STATIC_BODY);
        // const arr = this.add.image(1800, 890, 'arrow');
        // arr.setScale(0.6);

        // Add overlap detection for scene transition
        this.physics.add.overlap(
            this.player,
            this.targetZone,
            () => this.scene.start('MainGame2'),
            undefined,
            this
        );


        // Add collisions
        // this.physics.add.collider(this.player, this.groundBottom);
        this.sage = this.physics.add.sprite(width * 0.8, height * 0.4, 'sage');
        this.sage.setBounce(0.1);
        this.sage.setScale(1);
        this.sage.setGravityY(300);
        this.sage.setCollideWorldBounds(true);
        // this.sage.setTint(0x00ff00);  // Give it a green tint to distinguish from wizard

        // Add Collisions
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.wizard, this.platforms);
        this.physics.add.collider(this.sage, this.platforms);

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();

        this.createQuizDialog();
        this.physics.add.overlap(
            this.player,
            this.wizard,
            this.handleWizardInteraction,
            undefined,
            this
        );
        this.createhintDialog();
        this.physics.add.overlap(
            this.player,
            this.wizard,
            this.handleWizardInteraction,
            undefined,
            this
        );


        // Add overlap with sage
        this.physics.add.overlap(
            this.player,
            this.sage,
            this.handleSageInteraction,
            undefined,
            this
        );

        // Create modal
        // this.createModal();

        EventBus.emit('current-scene-ready', this);
    }
    private createQuizDialog() {
        const width = window.innerWidth;
        const height = window.innerHeight;

        this.quizDialog = this.add.container(width / 2, height / 2);

        // Create background
        const background = this.add.rectangle(0, 0, 400, 300, 0x000000, 0.8);

        // Create close button
        const closeButton = this.add.text(170, -130, '×', {
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5);
        closeButton.setInteractive({ useHandCursor: true });
        closeButton.on('pointerdown', () => this.closeQuiz());
        closeButton.on('pointerover', () => closeButton.setColor('#ff0000'));
        closeButton.on('pointerout', () => closeButton.setColor('#ffffff'));
        const questionImage = this.add.image(0, -83, 'question2').setOrigin(0.5);


        // Create input field instructions
        

        // Create input field
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'quizInput';
        input.style.position = 'fixed';
        input.style.left = `${(width / 2) - 100}px`;
        input.style.top = `${(height / 2) + 20}px`;
        input.style.width = '200px';
        input.style.padding = '8px';
        input.style.fontSize = '16px';
        input.style.border = '1px solid #4a90e2';
        input.style.borderRadius = '4px';
        input.style.color = '#000000';
        input.style.backgroundColor = '#ffffff';
        input.style.display = 'none';
        input.style.zIndex = '1000';
        input.style.opacity = '1';

        document.body.appendChild(input);

        this.quizDialog.add([background, closeButton, questionImage]);
        this.quizDialog.setVisible(false);
    }
    private createhintDialog() {
        const width = window.innerWidth;
        const height = window.innerHeight;
    
        // Create the hint dialog container
        const hintDialog = this.add.container(width / 2, height / 2);
    
        // Create background
        const background = this.add.rectangle(0, 0, 400, 300, 0x000000, 0.8);
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'quizInput';
        input.style.position = 'fixed';
        input.style.left = `${(width / 2) - 100}px`;
        input.style.top = `${(height / 2) + 100}px`;
        input.style.width = '200px';
        input.style.padding = '8px';
        input.style.fontSize = '16px';
        input.style.border = '1px solid #4a90e2';
        input.style.borderRadius = '4px';
        input.style.color = '#000000';
        input.style.backgroundColor = '#ffffff';
        input.style.display = 'none';
        input.style.zIndex = '1000';
        input.style.opacity = '1';
    
        document.body.appendChild(input);
    
        // Create close button
        const closeButton = this.add.text(170, -130, '×', {
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5);
        closeButton.setInteractive({ useHandCursor: true });
        closeButton.on('pointerdown', () => hintDialog.setVisible(false));
    
        // Create hint image
        const hintImage = this.add.image(0, -146, 'hint2').setOrigin(0.5);
    
        hintDialog.add([background, closeButton, hintImage]);
        hintDialog.setVisible(false);
    
        // Assign to this.hintDialog
        this.hintDialog = hintDialog;
    }
    
    
    private handleWizardInteraction() {
        if (!this.quizActive && !this.quizCompleted && !this.quizCooldown) {  // Check cooldown
            this.quizActive = true;
            this.showQuestion();
            this.physics.pause();
        }
    }
    
    private handleSageInteraction() {
        if (!this.hasHint) {
            this.hasHint = true;
            
            // Make the sage fade out
            this.tweens.add({
                targets: this.sage,
                alpha: 0,
                duration: 1000,
                ease: 'Power2',
                onComplete: () => {
                    this.sage.destroy();
                }
            });
        }
    }
    
    private showQuestion() {
        const questions = [
            {
                questionImageKey1: "question2", // Key for the question PNG
                correct: "54",
                
            },
        ];
    
        this.currentQuestion = questions[0];
        const questionImage = this.quizDialog.getAt(2) as Phaser.GameObjects.Image;
        questionImage.setTexture(this.currentQuestion.questionImageKey1);
        
        // Add hint if collected
        if (this.hasHint) {
            this.hintDialog.setVisible(true);
        }
        
        // questionText.setText(questionDisplay);
        this.quizDialog.setVisible(true);

        const input = document.getElementById('quizInput') as HTMLInputElement;
        input.style.display = 'block';
        input.focus();

        // Remove existing event listener if it exists
        if (this.keydownListener) {
            input.removeEventListener('keydown', this.keydownListener);
        }

        // Create and store new event listener
        this.keydownListener = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                const userAnswer = input.value.trim();
                this.checkAnswer(userAnswer);
            }
        };
        input.addEventListener('keydown', this.keydownListener);
    }
    
    private checkAnswer(answer: string) {
        const input = document.getElementById('quizInput') as HTMLInputElement;
        
        // Remove the event listener when checking answer
        if (this.keydownListener) {
            input.removeEventListener('keydown', this.keydownListener);
            this.keydownListener = null;
        }
        
        input.style.display = 'none';
        input.value = '';

        const questionText = this.quizDialog.getAt(2) as Phaser.GameObjects.Text;
        if (answer === '35') {
            this.quizCompleted = true;
            const arr = this.add.image(1800, 840, 'arrow');
            arr.setScale(0.6);
        } else {
            questionText.setText("Incorrect, try again!");
            // Show the question again after a delay if answer was incorrect
            setTimeout(() => {
                this.showQuestion();
            }, 1500);
        }

        setTimeout(() => {
            if (answer === '35') {  // Only close if answer was correct
                this.quizDialog.setVisible(false);
                this.hintDialog.setVisible(false);
                this.quizActive = false;
                this.physics.resume();
            }
        }, 1500);
    }
    
    private closeQuiz() {
        const input = document.getElementById('quizInput') as HTMLInputElement;
        
        // Remove the event listener when closing quiz
        if (this.keydownListener) {
            input.removeEventListener('keydown', this.keydownListener);
            this.keydownListener = null;
        }
        
        input.style.display = 'none';
        input.value = '';

        this.quizDialog.setVisible(false);
        this.quizActive = false;
        this.physics.resume();
        
        // Set cooldown
        this.quizCooldown = true;
        setTimeout(() => {
            this.quizCooldown = false;
        }, 2000);
    }

    update() {
        // Only process movement if modal is not visible and input is not focused
        // if (this.modalElements.background.visible || document.activeElement?.id === 'nameInput') return;

        const onGround = this.player.body.touching.down;

        // Horizontal movement
        if (this.cursors.right.isDown) {
            this.player.setVelocityX(500);
            this.player.setFlipX(true);
            if (onGround) {
                this.player.play('walk', true);
            }
        }
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-500); 
            this.player.setFlipX(false);
            if (onGround) {
                this.player.play('walk', true);
            }
        }
        else {
            this.player.setVelocityX(0);
            if (onGround) {
                this.player.play('idle', true);
            }
        }

        // Jumping - only allow when on ground
        if (this.cursors.up.isDown && onGround) {
            this.player.setVelocityY(-700);
            this.player.play('jump', true);
        }
        
        // If in air and not playing jump animation, play jump frame 2
        if (!onGround && !this.player.anims.isPlaying) {
            this.player.setTexture('jump2');
        }
    }
}