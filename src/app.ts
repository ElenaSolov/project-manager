/// <reference path='ProjectInput.ts' />
import { projectStatus } from "./types/types.js";
import ProjectInput from "./ProjectInput.js";
import ProjectList from "./ProjectList.js";

new ProjectInput();
new ProjectList(projectStatus.active);
new ProjectList(projectStatus.finished);
