# This is a sample of an events file

To add events, write them below the Events Start header.

## Syntax

### Note

@m:ss note "content in quotes" duration-in-milliseconds

e.g. @0:01 note "I love notes" 1000

### Quiz

@m:ss quiz "question?" "answer" "answer" "answer" correct-answer-number

the correct-answer number is 0-indexed, meaning that the first answer is number 0, the second is 1 etc.

e.g. @0:01 quiz "which is best?" "snow" "ice" "hail" 2
this means that "hail" is the correct answer

### Size Change

@m:ss size-change height-in-pixels width-in-pixels

e.g. @0:01 size-change 400 400

### Background Image

@m:ss background "url of image" duration-in-milliseconds

e.g.

@0:01 background "https://i1.wp.com/snookerhq.com/wp-content/uploads/2020/12/snooker-table-WST.jpeg?w=960&ssl=1" 1000

Who knows what events will be added next?

## Events Start

@0:05 note "Being straight is a curse" 2000
@0:11 note Tom's fashion sense is truly a blessing 3000
@0:19 quiz "Why do we go inside Tom's shirt?" "caress his manly hair" "check him for spying equipment" "distract from life's despair" 1
@0:25 size-change 1000 1500
@0:26 size-change 390 640
@0:29 background "https://media.giphy.com/media/xThuWcaa4U4XZQDgvm/giphy.gif" 700
