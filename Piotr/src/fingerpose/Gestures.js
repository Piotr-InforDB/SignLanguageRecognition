import GestureDescription from "fingerpose/src/GestureDescription";
import {Finger, FingerCurl, FingerDirection} from "fingerpose/src/FingerDescription";

export const signLanguage = [];

const { Thumb, Index, Middle, Ring, Pinky } = Finger;
const { VerticalUp, VerticalDown, HorizontalLeft, HorizontalRight, DiagonalUpRight, DiagonalUpLeft, DiagonalDownRight, DiagonalDownLeft} = FingerDirection;
const { NoCurl, HalfCurl, FullCurl } = FingerCurl;

//A
const a = new GestureDescription('A');
a.addDirection(Index, VerticalDown, .9);
a.addCurl(Index, FullCurl, .85);

a.addDirection(Middle, VerticalDown, .9);
a.addCurl(Middle, FullCurl, .85);

a.addDirection(Ring, VerticalDown, .9);
a.addCurl(Ring, FullCurl, .85);

a.addDirection(Pinky, VerticalDown, .9);
a.addCurl(Pinky, FullCurl, .85);

a.addDirection(Thumb, DiagonalUpLeft, .9)
a.addDirection(Thumb, DiagonalUpRight, .9)
a.addCurl(Thumb, NoCurl, 1);
signLanguage.push(a);

//B
const b = new GestureDescription('B');
b.addDirection(Index, VerticalUp, .9);
b.addCurl(Index, NoCurl, 1);

b.addDirection(Middle, VerticalUp, .9);
b.addCurl(Middle, NoCurl, 1);

b.addDirection(Ring, VerticalUp, .9);
b.addCurl(Ring, NoCurl, 1);

b.addDirection(Pinky, VerticalUp, .9);
b.addCurl(Pinky, NoCurl, 1);

b.addDirection(Thumb, HorizontalLeft, .9)
b.addDirection(Thumb, HorizontalRight, .9)
b.addCurl(Thumb, HalfCurl, .9);
signLanguage.push(b);

//C
const c = new GestureDescription('C');
c.addDirection(Index, HorizontalLeft, .9);
c.addDirection(Index, HorizontalRight, .9);
c.addCurl(Index, HalfCurl, .9);

c.addDirection(Middle, HorizontalLeft, .9);
c.addDirection(Middle, HorizontalRight, .9);
c.addCurl(Middle, HalfCurl, .9);

c.addDirection(Ring, HorizontalLeft, .9);
c.addDirection(Ring, HorizontalRight, .9);
c.addCurl(Ring, HalfCurl, .9);

c.addDirection(Pinky, HorizontalLeft, .9);
c.addDirection(Pinky, HorizontalRight, .9);
c.addCurl(Pinky, HalfCurl, .9);

c.addDirection(Thumb, DiagonalUpLeft, .8)
c.addDirection(Thumb, DiagonalUpRight, .8)
c.addCurl(Thumb, NoCurl, .95);
signLanguage.push(c);

export const fingers = {
    Thumb : [],
    Index : [],
    Middle : [],
    Ring : [],
    Pinky : [],
};
for(const finger of [Thumb, Index, Middle, Ring, Pinky]){
    for(const direction of [VerticalUp, VerticalDown, HorizontalLeft, HorizontalRight, DiagonalUpRight, DiagonalUpLeft, DiagonalDownRight, DiagonalDownLeft]){
        for(const curl of [NoCurl, HalfCurl, FullCurl]){
                    let name = Finger.getName(finger);
                    name += '_'+FingerDirection.getName(direction);
                    name += '_'+FingerCurl.getName(curl);

                    const temp = new GestureDescription(name);

                    temp.addDirection(finger, direction, .9);
                    temp.addCurl(finger, curl, .65);

                    fingers[Finger.getName(finger)].push(temp);
        }
    }
}
