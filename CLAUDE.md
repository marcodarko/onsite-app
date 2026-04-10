# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A SPA that lists events taking place during a given time period.  Each event lists the person(s) moderating the event, their photo, title, description, a badge with a time until event starts eg. "tomorrow" "2 hours from now" "happening now". 
Events happening now should be highlighted. 

Event data will come from a JSON file in this repo called "events.json".

Events will be grouped by day and subgroups of time slots.

## Environment Setup

```bash
npm run dev
```

## Running the Pipeline

1. Read `AGENT.md` if available for execution rules
2. Commit scripts with a descriptive message of steps taken and assests to git

## Architecture

Use Node LTS version, React, TailwindCSS, moment.js and any other necessary libraries to achieve the goal.
