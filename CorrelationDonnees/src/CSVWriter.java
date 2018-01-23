import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.HashMap;

public class CSVWriter {

	public static void TabToCSV(HashMap<String, HashMap<String, Category>> mapCorrelations,
			HashMap<String, Category> mapCategories) throws IOException {
		HashMap<String, Category> mapUnders = mapCorrelations.get("Underweight");
		HashMap<String, Category> mapNormals = mapCorrelations.get("Normal weight");
		HashMap<String, Category> mapOvers = mapCorrelations.get("Overweight");
		HashMap<String, Category> mapObess = mapCorrelations.get("Obesity");
		BufferedWriter writer = new BufferedWriter(new FileWriter("sortie.csv"));
		writer.write("Category Name, Underweight, Normal weight, Overweight, Obesity");
		writer.newLine();
		for (String categoryName : mapCategories.keySet()) {
			writer.write(categoryName + ",");
			writer.write(mapUnders.get(categoryName).toString() + ",");
			writer.write(mapNormals.get(categoryName).toString() + ",");
			writer.write(mapOvers.get(categoryName).toString() + ",");
			writer.write(mapObess.get(categoryName).toString());
			writer.newLine();
		}
		writer.close();
	}
}
