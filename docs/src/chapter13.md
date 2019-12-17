

This link looks intersting:
[Logging](https://discourse.julialang.org/t/how-to-save-logging-output-to-a-log-file/14004/5)

```julia
julia> using Logging

julia> io = open("log.txt", "w+");

julia> logger = SimpleLogger(io);

julia> with_logger(logger) do
           @info(" here is some context specific logging")
       end

shell> cat log.txt

julia> flush(io);

shell> cat log.txt
┌ Info:  here is some context specific logging
└ @ Main REPL[7]:2

julia> global_logger(logger);

julia> @info("All logs will use the global logger by default.");

shell> cat log.txt
┌ Info:  here is some context specific logging
└ @ Main REPL[7]:2

julia> close(io);

shell> cat log.txt
┌ Info:  here is some context specific logging
└ @ Main REPL[7]:2
┌ Info: All logs will use the global logger by default.
└ @ Main REPL[12]:1
```
