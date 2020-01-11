# 5. Writing test software

## runtest.jl

## Cases

```Julia
@testset "SubscriberType test" begin
    @test SubscriberType(0) == MEAN_CALCULATOR
    @test SubscriberType(1) == STD_CALCULATOR
    @test SubscriberType(2) == PLOTTER
end
```
