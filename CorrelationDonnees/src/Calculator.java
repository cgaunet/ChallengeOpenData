import java.util.HashMap;
import java.util.List;

public class Calculator {
	private HashMap<String, HashMap<String, Double>> mapCorrelations;
	private List<List<String>> listHumans;
	private HashMap<String, Integer> mapCorrespondance;
	
	public Calculator(List<List<String>> listHumans) {
		this.listHumans = listHumans;
		this.mapCorrelations= new HashMap<>();
		
	}
	//apptotal_hebdo = Double.parseDouble(human.get(301));
	public void calc() {
		double imc = 0.0;
//		double apptotal_hebdo = 0.0;
		for (List<String> human : this.listHumans){
			try{
				imc = Double.parseDouble(human.get(284));
				if (imc < 18.5){
					//case Underweight
					addCorrelations("Underweight", human);
				}else if (imc >= 18.5 && imc <= 24.99){
					//case Normal weight
					addCorrelations("Normal weight", human);
				}else if (imc >= 25.0 && imc <= 30.0){
					//cas Overweigth
					addCorrelations("Overweight", human);
				}else{
					//cas Obesity
					addCorrelations("Obesity", human);
				}
			}catch(Exception e){
//					System.out.println(e.toString());
			}
			
		}
	}
	public void addCorrelations(String caseWeigth, List<String> human){
		
	}
	
	public double getValueFromIndex(List<String> human, int index){
		try{
			double value = Double.parseDouble(human.get(index));
			return value;
		}catch(Exception e){
			return 0.0;
		}
	}
	private void initializeMapCorrelation(){
		HashMap<String, Double> mapTemp = new HashMap<String, Double>();
		mapTemp.put("apptotal_hebdo", 0.0);
		mapTemp.put("bonalim", 0.0);
		mapTemp.put("colmata", 0.0);
		mapTemp.put("distbar", 0.0);
		mapTemp.put("distsoda", 0.0);
		mapTemp.put("distsoli", 0.0);
		mapTemp.put("distgat", 0.0);
		mapTemp.put("distconf", 0.0);
		mapTemp.put("distbiss", 0.0);
		mapTemp.put("entrerep", 0.0);
		mapTemp.put("fastfood", 0.0);
		mapTemp.put("fqfec", 0.0);
		mapTemp.put("fqfl", 0.0);
		mapTemp.put("fqpl", 0.0);
		mapTemp.put("fqvpo", 0.0);
		mapTemp.put("intalicuisi", 0.0);
		mapTemp.put("mfrom", 0.0);
		mapTemp.put("mfruit", 0.0);
		mapTemp.put("mglace", 0.0);
		mapTemp.put("mjus", 0.0);
		mapTemp.put("mlait", 0.0);
		mapTemp.put("mleg", 0.0);
		mapTemp.put("mpois", 0.0);
		mapTemp.put("msoda", 0.0);
		mapTemp.put("mvian", 0.0);
		mapTemp.put("myao", 0.0);
		mapTemp.put("autreregmedic_cod", 0.0);
		mapTemp.put("selassent", 0.0);
		mapTemp.put("selassfec", 0.0);
		mapTemp.put("selassleg", 0.0);
		mapTemp.put("selassoeuf", 0.0);
		mapTemp.put("selassvp", 0.0);
		mapTemp.put("selassvps", 0.0);
		mapTemp.put("tage", 0.0);
		mapTemp.put("tele", 0.0);
		mapTemp.put("v2_age", 0.0);
		this.mapCorrelations.put("Underweight", new HashMap<>(mapTemp));
		this.mapCorrelations.put("Normal weight", new HashMap<>(mapTemp));
		this.mapCorrelations.put("Overweight", new HashMap<>(mapTemp));
		this.mapCorrelations.put("Obesity", new HashMap<>(mapTemp));
	}
	
	private void initializeMapCorrespondance(){
		this.mapCorrespondance.put("apptotal_hebdo", 301);
		this.mapCorrespondance.put("bonalim", 47);
		this.mapCorrespondance.put("colmata", 3);
		this.mapCorrespondance.put("distbar", 189);
		this.mapCorrespondance.put("distsoda", 187);
		this.mapCorrespondance.put("distsoli", 7);
		this.mapCorrespondance.put("distgat", 190);
		this.mapCorrespondance.put("distconf", 5);
		this.mapCorrespondance.put("distbiss", 191);
		this.mapCorrespondance.put("entrerep", 2);
		this.mapCorrespondance.put("fastfood", 8);
		this.mapCorrespondance.put("fqfec", 104);
		this.mapCorrespondance.put("fqfl", 107);
		this.mapCorrespondance.put("fqpl", 106);
		this.mapCorrespondance.put("fqvpo", 105);
		this.mapCorrespondance.put("intalicuisi", 173);
		this.mapCorrespondance.put("mfrom", 139);
		this.mapCorrespondance.put("mfruit", 137);
		this.mapCorrespondance.put("mglace", 138);
		this.mapCorrespondance.put("mjus", 144);
		this.mapCorrespondance.put("mlait", 142);
		this.mapCorrespondance.put("mleg", 135);
		this.mapCorrespondance.put("mpois", 140);
		this.mapCorrespondance.put("msoda", 141);
		this.mapCorrespondance.put("mvian", 136);
		this.mapCorrespondance.put("myao", 143);
		this.mapCorrespondance.put("autreregmedic_cod", 158);
		this.mapCorrespondance.put("selassent", 10);
		this.mapCorrespondance.put("selassfec", 12);
		this.mapCorrespondance.put("selassleg", 11);
		this.mapCorrespondance.put("selassoeuf", 15);
		this.mapCorrespondance.put("selassvp", 13);
		this.mapCorrespondance.put("selassvps", 14);
		this.mapCorrespondance.put("tage", 278);
		this.mapCorrespondance.put("tele", 289);
		this.mapCorrespondance.put("v2_age", 273);
	}
}
