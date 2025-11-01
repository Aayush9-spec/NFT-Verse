import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { platform } from 'os';

export class Game extends Scene {
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars!: Phaser.Physics.Arcade.Group;
    private modal!: Phaser.GameObjects.Rectangle;
    private score: number = 0;
    private groundTop!: Phaser.Physics.Arcade.StaticGroup;
    // private groundBottom!: Phaser.Physics.Arcade.StaticGroup;
    private modalElements!: any;
    private wizard!: Phaser.Physics.Arcade.Sprite;
    private quizActive: boolean = false;
    private currentQuestion: any = null;
    private quizDialog!: Phaser.GameObjects.Container;
    private quizCompleted: boolean = false;
    private keydownListener: ((event: KeyboardEvent) => void) | null = null;
    private sage!: Phaser.Physics.Arcade.Sprite;
    private hasHint: boolean = false;
    private quizCooldown: boolean = false;
    targetZone: Phaser.GameObjects.Zone;
    hintDialog: any;

    constructor() {
        super('Game');
    }

    preload() {
        this.load.setPath('assets');
        
        // Load game assets
        this.load.image('sky', 'latest.png');
        this.load.image('ground-top', 'top.svg');
        // this.load.image('ground-bottom', 'botoom.svg');
        this.load.image('tile', '222.svg');  // Load the tile image
        this.load.image('D','D.svg');
        this.load.image('A','A.svg');
        this.load.image('C','C.svg')
        this.load.image('ch','ch.svg')
        this.load.image('cl','complex.svg')
        this.load.image('B2','B2.png')
        this.load.image('B3','B3.png')
        this.load.image('L1','L1.png')
        this.load.image('L2','L2.png')
        this.load.image('B1','B1.png')
        this.load.image('l-1','l-1.png')
        this.load.image('r-1','r-1.png')
        this.load.image('t-1','t-1.png')
        this.load.image('correct_answer', 'correct_answer.svg');
        this.load.image('wrong_answer', 'wrong_answer.svg');
        this.load.image('wizard','baba1.png');
        this.load.image('sage', 'rst.png');  // Using same image for now, you can replace with different image
        this.load.image('arrow','arrow2.svg')
        // Load player sprites
        this.load.image('still1', 'still1.png');
        this.load.image('still2', 'still2.png');
        this.load.image('walk1', 'walk1.png');
        this.load.image('walk2', 'walk2.png');
        this.load.image('jump1', 'jump1.png');
        this.load.image('jump2', 'jump2.png');
        this.load.image('jump3', 'jump3.png');
        this.load.image('question1', 'Q1normal.svg');
        this.load.image('hint1', 'Q1Hint.svg');
        
        
        this.load.image('collectible', 'star.png');
        this.load.image('wrong_answer', 'wrong_answer.svg');
        this.load.image('correct_answer', 'correct_answer.svg');
    }

    create() {
        // Get window dimensions
        const width = window.innerWidth;
        const height = window.innerHeight;
        console.log(width,height)
        // Add background
        const bg = this.add.image(width/2, height/2, 'sky');
        bg.setDisplaySize(width, height );
        this.groundTop = this.physics.add.staticGroup();
        this.platforms = this.physics.add.staticGroup();

        // Create a single tile platform
        const platform1 = this.platforms.create(842,  744, 'tile');
        platform1.setScale(1.6).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform2 = this.platforms.create(1920-825,  744, 'tile');
        platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform2.setFlipX(true); // Slightly transparent
        const platform3 = this.platforms.create(152,  717, 'D');
        platform1.setScale(1.6).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform4= this.platforms.create(1783,  717, 'D');
        platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform2.setFlipX(true); // Slightly transparent
        const platform5 = this.platforms.create(528,  848, 'A');
        platform1.setScale(1.6).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform6= this.platforms.create(1399,  848, 'A');
        platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform2.setFlipX(true); // Slightly transparent
        const platform7 = this.platforms.create(265,  280, 'C');
        platform1.setScale(1.6).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform8= this.platforms.create(1666,  280, 'C');
        platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform2.setFlipX(true); // Slightly transparent
        const platform9= this.platforms.create(960,  410, 'A');
        platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        const platform10 = this.platforms.create(408,  513, 'cl');
        platform10.setScale(0.8).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform11 = this.platforms.create(1524,  513, 'cl');
        platform11.setScale(0.8).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform11.setFlipX(true); // Slightly transparent
        const platform12 = this.platforms.create(587,  464, 'ch');
        platform12.setScale(0.8).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform13= this.platforms.create(1342,  464, 'ch');
        platform13.setScale(0.8).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform13.setFlipX(true); // Slightly transparent
        const platform14= this.platforms.create(136,  990, 'B1');
        platform14.setAlpha(0)
        const platform15= this.platforms.create(960,  990, 'B2');
        platform15.setAlpha(0)
        const platform16= this.platforms.create(1784,  990, 'B3');
        platform16.setAlpha(0)
        const platform17= this.platforms.create(521,  1051, 'L1');
        platform17.setAlpha(0)
        const platform18= this.platforms.create(1399,  1051, 'L2');
        platform18.setAlpha(0)
        const platform19= this.platforms.create(960,  107, 't-1');
        platform19.setAlpha(0)
        const platform20= this.platforms.create(43,  494, 'l-1');
        platform20.setAlpha(0)
        const platform21= this.platforms.create(1896,  465, 'r-1');
        platform21.setAlpha(0)

        



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
        this.player = this.physics.add.sprite(width * 0.1, height * 0.4, 'still1');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.085);
        this.player.play('idle');
        this.targetZone = this.add.zone(1800 ,800, 100, 100);
        this.physics.world.enable(this.targetZone, Phaser.Physics.Arcade.STATIC_BODY);
        if(this.quizCompleted){
            const arr = this.add.image(1800, 840, 'arrow');
            arr.setScale(0.6);
        }
        
        // Debug visualization of the zone (remove in production)
        // this.add.rectangle(100, 800, 100, 100, 0xff0000, 0.3);

        // Add overlap detection for scene transition
        this.physics.add.overlap(
            this.player,
            this.targetZone,
            () => this.scene.start('MainGame1'),
            undefined,
            this
        );
        this.wizard = this.physics.add.sprite(556, 150, 'wizard');
        this.wizard.setBounce(0.1);
        this.wizard.setScale(0.12);
        this.wizard.setGravityY(300); 
        // this.wizard.setImmovable(true);
        this.wizard.setFlipX(true);
        this.wizard.setCollideWorldBounds(true);
        // this.wizard.play('idle');
        // Add the sage character
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
        const questionImage = this.add.image(0, -20, 'question1').setOrigin(0.5);


        // Create input field instructions
        

        // Create input field
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'quizInput';
        input.style.position = 'fixed';
        input.style.left = `${(width / 2) - 120}px`;
        input.style.top = `${(height / 2) + 34}px`;
        input.style.width = '255px';
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
        const hintImage = this.add.image(0, -94, 'hint1').setOrigin(0.5);
    
        hintDialog.add([background, closeButton, hintImage]);
        hintDialog.setVisible(false);
    
        // Assign to this.hintDialog
        this.hintDialog = hintDialog;
    }
    
    
    private handleWizardInteraction() {
        // Check if quiz is not active and not completed
        if (!this.quizActive && !this.quizCompleted && !this.quizCooldown) {
            this.quizActive = true;
            this.showQuestion();
            
            // Do not pause physics, allow player movement
            // this.physics.pause(); // Comment out or remove this line
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
                questionImageKey: "question1", // Key for the question PNG
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
        if (answer === '54') {
            

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
            if (answer === '54') {  // Only close if answer was correct
                this.quizDialog.setVisible(false);
                this.hintDialog.setVisible(false);
                this.quizCompleted=true;
                

                this.quizActive = false;
                this.physics.resume();
            }
        }, 1500);
    }

    private closeQuiz() {
        const input = document.getElementById('quizInput') as HTMLInputElement;
        input.style.display = 'none';
        input.value = '';

        this.quizDialog.setVisible(false);
        this.quizActive = false;
        
        // Do not resume physics to maintain player movement
        // this.physics.resume(); // Comment out or remove this line
        
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