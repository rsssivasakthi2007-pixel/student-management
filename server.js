const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://rsssivasakthi2007_db_user:F1CqWqbDWNvij4m8@cluster0.msj3bq1.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();

        const db = client.db("college");
        const students = db.collection("students");

        await students.insertMany([
            {
                studentId: "S001",
                name: "Arun",
                department: "AI&DS",
                year: 2,
                cgpa: 8.5
            },
            {
                studentId: "S002",
                name: "Priya",
                department: "CSE",
                year: 2,
                cgpa: 8.2
            }
        ]);

        console.log("All Students:");

        const allStudents = await students.find().toArray();
        console.log(allStudents);

        await students.deleteOne({
            studentId: "S002"
        });

        console.log("Student deleted");

        console.log("Remaining Students:");

        const remaining = await students.find().toArray();
        console.log(remaining);

    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

main();