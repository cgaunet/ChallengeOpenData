import java.util.HashMap;
import java.util.List;

public class Calculator {
	private HashMap<String, HashMap<String, Double>> mapCorrelations;
	private List<List<String>> listHumans;
	
	public Calculator(List<List<String>> listHumans) {
		this.listHumans = listHumans;
		this.mapCorrelations= new HashMap<>();
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
		mapCorrelations.put("Insuffisance Pondérale", new HashMap<>(mapTemp));
		mapCorrelations.put("Corpulence Normale", new HashMap<>(mapTemp));
		mapCorrelations.put("Surpoids", new HashMap<>(mapTemp));
		mapCorrelations.put("Obésité", new HashMap<>(mapTemp));
	}
	//apptotal_hebdo = Double.parseDouble(human.get(301));
	public void calc() {
		double imc = 0.0;
		double apptotal_hebdo = 0.0;
		for (List<String> human : this.listHumans){
//			if (!human.get(284).isEmpty()){
				try{
					imc = Double.parseDouble(human.get(284));
				}catch(Exception e){
//					System.out.println(e.toString());
				}
//			}
		}
	}

}
