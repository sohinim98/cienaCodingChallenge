# cienaCodingChallenge
A single page web app to connect to an Optical Spectrum Analyzer through the cloud
and allow users to send different commands and receive response from the instrument

The data is plotted for the range returned by `LIM` and sometimes leads to
a flat curve because of similar data values.

## Deployed using GitHub Pages at
[Cloud Optical Spectrum Analyzer](https://sohinim98.github.io/cienaCodingChallenge/)

## List of commands
* `PING` - Returns `PONG`
* `IDN` - Returns device identification string
* `LIM` - Returns x-axis limits in m
* `ECHO/string` - Emulates query command and sends a string to API, will get the same string back
* `START` - Sets instrument state to continues acquisition
* `STOP` - 	Sets instrument state to IDLE
* `SINGLE` - Starts a single scan (blocking operation, single scan takes few seconds)
* `STATE` - Returns instrument state
* `TRACE` - Returns OSA trace in json format
### Type into the input container and hit `Query`
### Action buttons -
* `START` (to set instrument state to continuous acquisition and draw the graph)
* `STOP` (to sets instrument state to IDLE and clear the graph)
* `SINGLE` (starts a single scan (blocking operation, single scan takes few seconds)
and draws the graph.

## To run it locally -
### `npm start`
## To deploy -
### `npm run deploy`

## A couple of notes -
* I did not realize that using a python framework was compulsory, so I built it using React instead.
Hope that's okay since React was also a part of the tech stack in the posting.
* Continuous (repetitive) acquisition with ~1Hz refresh rate caused rate limiting, so I reduced it to making a single request per START command.
