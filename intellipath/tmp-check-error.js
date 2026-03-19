async function main() {
  try {
    const res = await fetch("http://localhost:3001/api/inngest", { method: "PUT" });
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Body:", text);
  } catch(e) {
    console.error(e);
  }
}
main();
