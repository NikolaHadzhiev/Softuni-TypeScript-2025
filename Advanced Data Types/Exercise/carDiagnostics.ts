type DiagnosticPart = { partName: string, runDiagnostics: () => string };

type CarBody = { material: string, state: string } & DiagnosticPart;
type Tires = { airPressure: number, condition: string } & DiagnosticPart;
type Engine = { horsepower: number, oilDensity: number } & DiagnosticPart;

export function diagnose(carBody: CarBody, tires: Tires, engine: Engine) {
    console.log(carBody.runDiagnostics());
    console.log(tires.runDiagnostics());
    console.log(engine.runDiagnostics());
}