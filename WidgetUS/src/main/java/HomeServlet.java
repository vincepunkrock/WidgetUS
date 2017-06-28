import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;

import com.google.gson.Gson;
import org.jasig.cas.client.validation.AssertionImpl;

/**
 * Created by Vincent on 24.05.2017.
 */
@WebServlet("/HomeServlet")
public class HomeServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("application/json");
        Gson gson = new Gson();

        String action = request.getParameter("action");
        HashMap responseData = new HashMap();
        if(action == null){
            responseData.put("error", "Action not specified. Use this parameter: ?action=[action]");
        }
        else if(action.equals("getCIP")){
            responseData.put("cip", getAuthenticatedCIP(request));
        }
        else {
            responseData.put("error", "Action invalid. The valid actions are: 'getCIP'");
        }
        response.getWriter().append(gson.toJson(responseData));
    }

    private String getAuthenticatedCIP(HttpServletRequest request) {
        HttpSession session = request.getSession();
        if(session == null){
            return "";
        }
        AssertionImpl assertionImpl = (AssertionImpl) session.getAttribute("_const_cas_assertion_");
        return assertionImpl.getPrincipal().getName();
    }
}
