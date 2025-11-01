import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { platform } from 'os';

export class Game2 extends Scene {
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
        super('MainGame2');
    }

    preload() {
        this.load.setPath('assets');
        
        // Load game assets
        this.load.image('sky3', 'level3.png');
        this.load.image('ground-top', 'top.svg');
        // this.load.image('ground-bottom', 'botoom.svg');
        this.load.image('T','T.svg')
        this.load.image('V','V.svg')
        this.load.image('U','U.svg')
        this.load.image('S','S.svg')
        this.load.image('W','W.svg')
        this.load.image('X1','X1.svg')
        this.load.image('X2','X2.svg')
        this.load.image('Z1','Z1.svg')
        this.load.image('Z2','Z2.svg')
        this.load.image('Z3','Z3.svg')
        this.load.image('l-3','l-3.png')
        this.load.image('r-3','r-3.png')
        this.load.image('t-3','t-3.png')
        this.load.image('g-3','g-3.png')
        this.load.image('question3','Q3normaal.svg')
        this.load.image('hint3','Q3hint.png')
        this.load.image('sage', 'rst.png');  // Using same image for now, you can replace with different image
        this.load.image('arrow','arrow.svg')
        this.load.image('wizard', 'baba1.png');

       


        
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
        const bg = this.add.image(width/2, height/2, 'sky3');
        bg.setDisplaySize(width, height );
        this.groundTop = this.physics.add.staticGroup();

        this.platforms = this.physics.add.staticGroup();

        // Create a single tile platform
        // const platform1 = this.platforms.create(332,  836, 'T');
        // platform1.setScale(1.6).refreshBody(); // Reduced scale
        // platform1.setAlpha(1); // Slightly 
        const platform12 = this.platforms.create(1589,  836, 'T');
        platform12.setAlpha(1);
        const platform2 = this.platforms.create(525,  627, 'U');
        platform2.setScale(1).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform2.setFlipX(true); // Slightly transparent
        const platform13 = this.platforms.create(1291,  627, 'U');
        // const platform3 = this.platforms.create(248,  263, 'V');
        // const platform11 = this.platforms.create(1561,  263, 'V');
        // platform11.setFlipX(true); // Slightly transparent

        // platform1.setScale(1.6).refreshBody(); // Reduced scale
        // platform3.setAlpha(1); // Slightly 
        // const platform4= this.platforms.create(407,  966, 'W');
        // platform2.setScale(1.6).refreshBody(); // Reduced scale
    
        // platform4.setFlipX(true); // Slightly transparent
        // const platform5 = this.platforms.create(620,  299, 'X2');
        // platform1.setScale(1.6).refreshBody(); // Reduced scale
        // platform1.setAlpha(1); // Slightly 
        // const platform16= this.platforms.create(1617,  299, 'X2');
        // platform16.setFlipX(true); // Slightly transparent
        // const platform6= this.platforms.create(678,  184, 'X1');
        // platform2.setScale(1.6).refreshBody(); // Reduced scale
        // platform2.setAlpha(1)
        // platform6.setFlipX(true); // Slightly transparent
        // const platform17 = this.platforms.create(1740,  184, 'X1');
        // platform17.setFlipX(true); // Slightly transparent
        // const platform7 = this.platforms.create(567,  952, 'S');
        // platform1.setScale(1.6).refreshBody(); // Reduced scale
        // platform1.setAlpha(1); // Slightly 
        const platform8= this.platforms.create(960,  787, 'Z2');
        
        // platform8.setFlipX(true); // Slightly transparent
        const platform9= this.platforms.create(809,  840, 'Z1');
        
        const platform10 = this.platforms.create(1114,  840, 'Z3');
        platform10.setScale(1).refreshBody(); // Reduced scale
        // platform1.setAlpha(1); // Slightly 
        const platform18 = this.platforms.create(30,  549, 'l-3');
        // platform18.setFlipX(true); // Slightly transparent
        platform18.setAlpha(0);
        const platform19 = this.platforms.create(1896,  549, 'r-3');
        platform19.setAlpha(0);
        const platform20 = this.platforms.create(964,  84, 't-3');
        platform20.setAlpha(0);
        const platform21 = this.platforms.create(964,  1056, 'g-3');
        platform21.setAlpha(0);

        
        
        
        // platform10.setFlipX(true); // Slightly transparent
        

        



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
        this.wizard = this.physics.add.sprite(540, 350, 'wizard');
        this.wizard.setBounce(0.1);
        this.wizard.setScale(0.12);
        this.wizard.setGravityY(300); 
        // this.wizard.setImmovable(true);
        this.wizard.setFlipX(false);
        this.targetZone = this.add.zone(1800 ,800, 100, 100);
        this.physics.world.enable(this.targetZone, Phaser.Physics.Arcade.STATIC_BODY);
        
        // const arr = this.add.image(1800, 840, 'arrow');
        // arr.setScale(0.6);

        // Add overlap detection for scene transition
        this.physics.add.overlap(
            this.player,
            this.targetZone,
            () => {
                window.location.href = '/results'; // Redirect to the /results page
            },
            undefined,
            this
        );
        
        // Start with idle animation
        this.player.play('idle');
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
        const questionImage = this.add.image(0, -65, 'question3').setOrigin(0.5);


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
        const hintImage = this.add.image(0, -20, 'hint3').setOrigin(0.5);
    
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
                questionImageKey: "question3", // Key for the question PNG
                correct: "54",
                
            },
        ];
    
        this.currentQuestion = questions[0];
        const questionImage = this.quizDialog.getAt(2) as Phaser.GameObjects.Image;
        questionImage.setTexture(this.currentQuestion.questionImageKey);
        
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
        if (answer === '14') {
            // questionText.setText("Correct!");
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
            if (answer === '14') {  // Only close if answer was correct
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