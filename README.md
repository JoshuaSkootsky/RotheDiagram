# Rothe Diagram

The idea is to generate a Rothe diagram from an input.

# Explanations here.

I'll make a blog post about it on my blog [joshuaskootsky.com](https://joshuaskootsky.com)

# Getting started

We want to have a text field, that for now let's say will be limited to letters and numbers. I'll take one each of each number and letter.

# What is an inversion?

Try out the permutation `54132`. There is a black square representing the two, in the 2nd row.  This black square is in the 5th column, as the two comes last, or number five in the permutation. In the 2nd row, red squares show up for which numbers the 2 is inverting - it comes "ahead of" the 5, 3, and 2, so in the 2nd row, in their corresponding columns - 1, 2, and 3, there is a red square. There is no red square at column 3 row 2 because two is greater than 1, and in this permutation, 2 comes after 1, in its proper order. Hence with regards to 1, there is no inversion.

# Difficulties to resolve

A permutation of a sequence has to make certain assumptions. For example, is `5` a sequence? What about `lakjdhfa`? It seems like, at the very least, with arbitrary input, I need to make each char a unique value.

In addition, what is `a`? I am thinking that I should assign all lower case letters a number value. So `12djh7k` would be a valid sequence, and I'll be able to map out the inversions and make a Rothe diagram. If I was given `aaa12aaadjh7k` I'd take the first `a`, assign it a value, and then ignore the rest. Same with `111112543` - I'll take the first 1, ignore the others, and plot the rest of the sequence as if it was `12543`.

Part of a Rothe diagram is the concept of position. If '5' is input, the board needs to be at least 5x5 to accomodate the input. This creates some difficulties. First of all, we're expecting that if there is a 5, the permutation has all numbers less than 5. Users may not always do that. Secondly, the position is indexed starting at 1, and it's usually convenient to represent a grid with an `n x n` array of 0 indexed arrays.

I think if a user supplies an incomplete permutation, it could make sense to append at the end the continuation that would complete it. i.e. if `5` is input, then I should fill in: `5 4321` and draw the Rothe diagram of the sequence `54321`. But that seems wrong, what if the user inputs `634` and wants to see the Rothe diagram for that input?

The size of the generated array will depend on the maximum value input, but this will leave parts of the diagram empty if the permutation does not go from `[max ... 1]`.



