![AppliGate](/rbontekoe.github.io/logo5.png)

# Building Business Applications with Julia

*In this course, you learn to create Julia modules. The software you write makes use of these modules and runs in Docker containers.*

!!! info
    See the Blog for the latest remarks!

## Preface

In July 2018, I read an article about a new programming language that was rapidly gaining in popularity, [Julia](https://julialang.org/). It appealed to me how you could define a function. Almost exactly as I learned it during my bachelor study electronics: `f(x) = 2x² + 3x + 1`, in Julia written as `f(x) = 2x^2 + 3x + 1`. Then I set up a project to learn how to implement the observer pattern. It was easy, but shelved it because I was working on Scala at that moment.

While working with Scala, I came in touch with the Onion Architecture, after watching Wade Waldron's presentation, [Domain-Driven Design, and Onion Architecture](https://youtu.be/MnNeDXg3Qao). Since then, I use it.

The ease with which I could build business applications with Julia stayed with me.

At the beginning of 2019, a recruiter told me that the interest in Scala in the Netherlands was waning. Should I continue with Scala?

### A course syllabus?

I decided to stop with Scala and picked up my Julia observer trial project again.

It turned out that you can create effective documentation, using the package [Documenter.jl](https://github.com/JuliaDocs/Documenter.jl). You write it in the markdown language and you can insert examples of how to use your code. During the creation of the HTML code, you can have the cases tested, which is useful if you later expand the module and generate the documentation again.

I had already a GitHub Pages profile, and thought: "Why not set up the AppliGate website in this way and link it to my profile." I did it: [https://www.appligate.nl](https://www.appligate.nl/).

With trying out so many things with Julia, the problem arose that I could not find specific trials back in my notes. After the success of the website, I thought: "Why not set up a course where I can register all the interesting things?".

In June 2020, I discovered a new package called [Rocket.jl](https://github.com/biaslab/Rocket.jl) which supports the [actor model](https://www.brianstorti.com/the-actor-model/). I know the actor model from my Scala and Akka period. It makes your application more robust and the workflow easier. It is the main reason I rewrite the course.

### Business Applications with Julia

The result is this course Building Business Applications with Julia. Chapters 1 till 6 are ready now.

Rob Bontekoe
