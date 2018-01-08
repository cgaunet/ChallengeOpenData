import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.Charset;
import java.nio.charset.CharsetDecoder;
import java.nio.charset.CodingErrorAction;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class LoaderData {
//
//	public LoaderData() {
//	}
	
	public static List<List<String>> readBooksFromCSV(String fileName) {
        List<List<String>> humans = new ArrayList<>();
        Path pathToFile = Paths.get(fileName);
        try {
	        FileInputStream input = new FileInputStream(new File(pathToFile.toString()));
	        CharsetDecoder decoder = Charset.forName("UTF-8").newDecoder();
	        decoder.onMalformedInput(CodingErrorAction.IGNORE);
	        InputStreamReader reader = new InputStreamReader(input, decoder);
	        
	        // create an instance of BufferedReader
	        BufferedReader bufferedReader = new BufferedReader(reader);
	
            // read the first line from the text file
            String line = bufferedReader.readLine();
            //Skip column names
            line = bufferedReader.readLine();

            // loop until all lines are read
            while (line != null) {

                // use string.split to load a string array with the values from
                // each line of
                // the file, using a semicolon as the delimiter
                String[] attributes = line.split(";");
                List<String> human = new ArrayList<>(Arrays.asList(attributes));
                // adding  into ArrayList
                humans.add(human);
                // read next line before looping
                // if end of file reached, line would be null
                line = bufferedReader.readLine();
            }
            bufferedReader.close();
	    }catch (FileNotFoundException e) {
	        e.printStackTrace();
	    }catch( IOException e ) {
	        e.printStackTrace();
	    }
        
        return humans;
    }
}

