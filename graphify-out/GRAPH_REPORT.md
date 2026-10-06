# Graph Report - demo  (2026-10-07)

## Corpus Check
- Corpus is ~1,689 words - fits in a single context window. You may not need a graph.

## Summary
- 44 nodes · 43 edges · 11 communities (6 shown, 5 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 1 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Application and tests
- Package metadata
- NPM scripts
- Test dependencies
- Minimist dependency
- Axios dependency
- CORS dependency
- Express dependency
- Lodash dependency
- Serializer dependency

## God Nodes (most connected - your core abstractions)
1. `scripts` - 6 edges
2. `engines` - 2 edges
3. `axios` - 2 edges
4. `cors` - 2 edges
5. `express` - 2 edges
6. `lodash` - 2 edges
7. `minimist` - 2 edges
8. `serialize-javascript` - 2 edges
9. `jest` - 2 edges
10. `supertest` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (11 total, 5 thin omitted)

### Community 0 - "Application and tests"
Cohesion: 0.22
Nodes (9): app, cors, crypto, decideCreditBand(), { exec }, express, fs, { app, decideCreditBand } (+1 more)

### Community 1 - "Package metadata"
Cohesion: 0.25
Nodes (7): description, engines, node, main, name, private, version

### Community 2 - "NPM scripts"
Cohesion: 0.33
Nodes (6): scripts, sbom, scan, start, test, test:coverage

### Community 3 - "Test dependencies"
Cohesion: 0.40
Nodes (5): jest, devDependencies, jest, supertest, supertest

### Community 4 - "Minimist dependency"
Cohesion: 0.67
Nodes (3): minimist, dependencies, minimist

## Knowledge Gaps
- **26 isolated node(s):** `name`, `version`, `private`, `description`, `main` (+21 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Minimist dependency` to `Package metadata`, `Axios dependency`, `CORS dependency`, `Express dependency`, `Lodash dependency`, `Serializer dependency`?**
  _High betweenness centrality (0.319) - this node is a cross-community bridge._
- **Why does `scripts` connect `NPM scripts` to `Package metadata`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Test dependencies` to `Package metadata`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _26 weakly-connected nodes found - possible documentation gaps or missing edges._