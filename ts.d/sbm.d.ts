/// <reference path="./node-git.d.ts"/>
/// <reference path="./node-0.11.d.ts"/>

interface SbmConfig {
    project: string;
    dependencies: Dependency[];
}

interface Dependency {
    url: string;
    path: string;
    sha?: string;
    branch?: string;
}
